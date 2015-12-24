var gulp = require('gulp'),
    iff = require('gulp-if'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    jade = require('gulp-jade');

// var production = false;

// var options = {
//       sass: {
//         style: production ? 'compressed' : 'nested',
//         noCache: true
//       },

//       browserify: {
//         transform: production
//           ? [ 'coffeeify', 'uglifyify' ]
//           : [ 'coffeeify'],
//         extensions: [ '.coffee' ],
//         debug: !production
//       }
//     };

gulp.task('clean', function() {
  return gulp.src([ '../.tmp/public' ])
    .pipe(clean());
});

gulp.task('default', [
  'build',
  'watch'
]);

gulp.task('build', [
  'build-styles',
  'build-scripts',
  'build-assets'
]);

gulp.task('build-styles', [
  // 'build-styles-vendor',
  'build-styles-application'
]);

// gulp.task('build-styles-vendor', function() {
//   return gulp.src([ './bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css' ])
//     .pipe(rename({ prefix: '_', extname: '.scss' }))
//     .pipe(gulp.dest('./styles/vendors/'));
// });

gulp.task('build-styles-application', [
  // 'build-styles-vendor'
  ],
  function() {
    return gulp.src([ './styles/main.scss' ])
      .pipe(sass())
      .pipe(rename('screen.css'))
      .pipe(gulp.dest('../.tmp/public/styles/'));
  }
);

gulp.task('build-scripts', [
  'build-scripts-vendor',
  'build-scripts-application'
]);

gulp.task('build-scripts-vendor', function() {
  return gulp.src([
      './bower_components/lodash/lodash.js',
      './bower_components/modernizr/modernizr.js',
      './bower_components/jquery/jquery.js',

      './bower_components/angular/angular.js',
      './bower_components/angular-resource/angular-resource.js',
      './bower_components/angular-activerecord/src/angular-activerecord.js',
      './bower_components/angular-route/angular-route.js',

      // './bower_components/socket.io-client/socket.io.js',
      './bower_components/sails.io.js/dist/sails.io.js',
      './bower_components/angular-sails/dist/angular-sails.js',

      './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('../.tmp/public/scripts/'));
});

gulp.task('build-scripts-application', function() {
  return gulp.src([ './scripts/**/*.coffee' ])
    .pipe(coffee())
    .pipe(concat('application.js'))
    .pipe(gulp.dest('../.tmp/public/scripts/'));
});

gulp.task('build-assets', [
  'build-assets-templates',
  'build-assets-images'
]);

gulp.task('build-assets-templates', function() {
  return gulp.src([ './views/**/* '])
    .pipe(iff(/[.]jade$/, jade()))
    .pipe(gulp.dest('../.tmp/public/views/'));
});

gulp.task('build-assets-images', function() {
  return gulp.src([ './images/**/* '])
    .pipe(gulp.dest('../.tmp/public/images/'));
});

gulp.task('watch', [
  'watch-styles',
  'watch-scripts',
  'watch-assets'
]);

gulp.task('watch-styles', function() {
  return gulp.watch([ './styles/**/*.scss' ], [ 'build-styles' ]);
});

gulp.task('watch-scripts', function() {
  return gulp.watch([ './scripts/**/*.coffee' ], [ 'build-scripts' ]);
});

gulp.task('watch-assets', ['watch-assets-templates', 'watch-assets-images']);

gulp.task('watch-assets-templates', function() {
  return gulp.watch([ './views/**/*' ], [ 'build-assets-templates' ]);
});

gulp.task('watch-assets-images', function() {
  return gulp.watch([ './images/**/*' ], [ 'build-assets-images' ]);
});