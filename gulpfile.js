const gulp        = require('gulp');
const run         = require('gulp-run');
const del         = require('del');
const sourcemaps  = require('gulp-sourcemaps');
const gulpif      = require('gulp-if');

// SASS HELPERS
const sass         = require('gulp-sass');
const cssmin       = require('gulp-cssmin');
const reporter     = require('postcss-reporter');
const stylelint    = require('stylelint');
const postscss     = require('postcss-scss');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//JS HELPERS
const uglify     = require('rollup-plugin-uglify');
const eslint     = require('gulp-eslint');
const rollup     = require('rollup-stream');
const babel      = require('rollup-plugin-babel');
const source     = require('vinyl-source-stream');
const buffer     = require('vinyl-buffer');
const { minify } = require('uglify-es');
const path       = require('rollup-plugin-includepaths');
const inject       = require('rollup-plugin-inject');

// BUILD
gulp.task('build:dev', ['clean', 'scss']);
gulp.task('build:prod', ['clean', 'min:scss']);

// CLEAN
gulp.task('clean', ['clean:dev', 'clean:prod']);

gulp.task('clean:dev', () => {
  del('public/css/app.css.map');
  del('app/css/app.css');
});

gulp.task('clean:prod', () => {
  del('public/css/app.min.css');
});

// -------
// SCSS
// -------
gulp.task('scss', ['lint:scss'], () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        __dirname + '/node_modules/'
      ]
    }).on('error', sass.logError))
    .pipe(postcss(
      [
        autoprefixer({ browsers: ["> 0%"] }),
        reporter({
          clearReportedMessages: true
        })
      ],
      {
        syntax: postscss
      }
    ))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("public/css"));
});

// MINIFY
gulp.task('min:scss', ['lint:scss'], () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({
      includePaths: [
        __dirname + '/node_modules/bootstrap/scss'
      ]
    }).on('error', sass.logError))
    .pipe(postcss(
      [
        autoprefixer({ browsers: ["> 0%"] }),
        reporter({
          clearReportedMessages: true
        })
      ],
      {
        syntax: postscss
      }
    ))
    .pipe(concat('app.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('public/css'));
});

// LINT
gulp.task('lint:scss', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(postcss(
      [
        stylelint(),
        reporter({
          clearReportedMessages: true
        })
      ],
      {
        syntax: postscss
      }
    ))
});

gulp.task('watch:scss', ['clean:dev', 'scss'], () => {
  gulp.watch("src/scss/*.scss", ['scss']);
});

/*
// -------
// JS
// -------
const babelConfig = {
  exclude: "node_modules/**",
  presets: [
    [ "es2017" ]
  ],
  plugins: [
    "external-helpers"
  ],
  babelrc: false
};

const includePathOptions = {
  include: {},
  paths: ['node_modules/'],
  external: [],
  extensions: ['.js']
};

const rollupJS = (inputFile, options) => {
  return () => {
    return rollup({
      input: options.basePath + inputFile,
      format: options.format,
      sourcemap: options.sourcemap,
      plugins: options.plugins
    })
    .pipe(source(options.dest, options.basePath))
    .pipe(buffer())
    .pipe(gulpif(options.sourcemap, sourcemaps.init({loadMaps: true})))
    .pipe(gulpif(options.sourcemap, sourcemaps.write('.')))
    .pipe(gulp.dest(options.distPath))
  };
}

gulp.task('js', ['lint:js'], rollupJS('app.js', {
  basePath: 'src/js/',
  format: 'iife',
  distPath: 'public/js/',
  sourcemap: true,
  dest: 'app.js',
  plugins: [
    path(includePathOptions),
    babel(babelConfig),
  ],
  globals: {
    "jquery": "jQuery"
  }
}));

// LINT
gulp.task('lint:js', () => {
  return gulp.src(['src/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
});

// MINIFY
gulp.task('min:js', rollupJS('app.js', {
  basePath: 'src/js/',
  format: 'iife',
  distPath: 'public/js/',
  sourcemap: false,
  dest: 'app.min.js',
  plugins: [
    path(includePathOptions),
    babel(babelConfig),
    uglify({}, minify)
  ]
}));

gulp.task('watch:js', ['clean:dev', 'js'], () => {
  gulp.watch("src/js/*.js", ['js']);
});
*/
