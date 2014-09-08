var gulp = require('gulp'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify');

var production = false;

var options = {
      sass: {
        style: production ? 'compressed' : 'nested',
        noCache: true
      },

      browserify: {
        transform: production
          ? [ 'coffeeify', 'uglifyify' ]
          : [ 'coffeeify'],
        extensions: [ '.coffee' ],
        debug: !production
      }
    };

gulp.task('clean', function() {
  return gulp.src([ '.tmp/public' ])
    .pipe(clean());
});

gulp.task('styles', function() {
  return gulp.src([ './client/styles/main.scss' ])
    .pipe(sass())
    .pipe(rename('screen.css'))
    .pipe(gulp.dest('.tmp/public/styles/'))
});

gulp.task('scripts', function() {
  return gulp.src([ './client/scripts/app.coffee' ], { read: false })
    .pipe(browserify(options.browserify))
    .pipe(rename('application.js'))
    .pipe(gulp.dest('.tmp/public/scripts/'));
});

gulp.task('assets', function() {
  return gulp.src([
    './client/**/*',
    '!./client/{scripts,styles,views}',
    '!./client/{scripts,styles,views}/**/*'
  ]).pipe(gulp.dest('.tmp/public/'));
});

gulp.task('build', [ 'styles', 'scripts', 'assets' ]);

gulp.task('default', [ 'build' ]);