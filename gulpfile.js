const gulp        = require('gulp');
const run         = require('gulp-run');
const del         = require('del');
const sourcemaps  = require('gulp-sourcemaps');

// SASS HELPERS
const sass         = require('gulp-sass');
const cssmin       = require('gulp-cssmin');
const reporter     = require('postcss-reporter');
const stylelint    = require('stylelint');
const postscss     = require('postcss-scss');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

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
