var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee');

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

gulp.task('default', [ 'build' ]);

gulp.task('build', [ 'styles', 'scripts', 'assets' ]);

gulp.task('styles', function() {
  return gulp.src([ './client/styles/main.scss' ])
    .pipe(sass())
    .pipe(rename('screen.css'))
    .pipe(gulp.dest('.tmp/public/styles/'))
});

gulp.task('scripts', [ 'scripts-vendor', 'scripts-application' ]);

gulp.task('scripts-vendor', function() {
  return gulp.src([
      'bower_components/lodash/dist/lodash.js',
      'bower_components/modernizr/modernizr.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/restangular/dist/restangular.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('.tmp/public/scripts/'));
});

gulp.task('scripts-application', function() {
  return gulp.src([ './client/scripts/**/*.coffee' ])
    .pipe(coffee())
    .pipe(concat('application.js'))
    .pipe(gulp.dest('.tmp/public/scripts/'));
});

gulp.task('assets', function() {
  return gulp.src([
      './client/**/*',
      '!./client/{scripts,styles}',
      '!./client/{scripts,styles}/**/*'
    ])
    .pipe(gulp.dest('.tmp/public/'));
});