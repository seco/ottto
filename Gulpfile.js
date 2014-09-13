var gulp = require('gulp'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
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

gulp.task('default', [ 'build', 'watch' ]);

gulp.task('build', [ 'build-styles', 'build-scripts', 'build-assets' ]);

gulp.task('build-styles', function() {
  return gulp.src([ './client/styles/main.scss' ])
    .pipe(sass())
    .pipe(rename('screen.css'))
    .pipe(gulp.dest('.tmp/public/styles/'))
});

gulp.task('build-scripts', [ 'build-scripts-vendor', 'build-scripts-application' ]);

gulp.task('build-scripts-vendor', function() {
  return gulp.src([
      'bower_components/lodash/dist/lodash.js',
      'bower_components/modernizr/modernizr.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/socket.io-client/socket.io.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-activerecord/src/angular-activerecord.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('.tmp/public/scripts/'));
});

gulp.task('build-scripts-application', function() {
  return gulp.src([ './client/scripts/**/*.coffee' ])
    .pipe(coffee())
    .pipe(concat('application.js'))
    .pipe(gulp.dest('.tmp/public/scripts/'));
});

gulp.task('build-assets', function() {
  return gulp.src([
      './client/**/*',
      '!./client/{scripts,styles}',
      '!./client/{scripts,styles}/**/*'
    ])
    .pipe(gulp.dest('.tmp/public/'));
});

gulp.task('watch', [ 'watch-styles', 'watch-scripts', 'watch-assets' ]);

gulp.task('watch-styles', function() {
  return gulp.watch([ './client/styles/**/*.scss' ], [ 'build-styles' ]);
});

gulp.task('watch-scripts', function() {
  return gulp.watch([ './client/scripts/**/*.coffee' ], [ 'build-scripts' ]);
});

gulp.task('watch-assets', function() {
  return gulp.watch([ './client/**/*',
      '!./client/{scripts,styles}',
      '!./client/{scripts,styles}/**/*'
    ], [ 'build-assets' ]);
});