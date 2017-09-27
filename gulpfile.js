var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	//jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	lr = require('tiny-lr'),
	server = lr();

// Server - listed on localhost:8080
gulp.task('webserver', function() {
  connect.server({
    livereload:true      
  });
});

gulp.task('styles', function() {
  return gulp.src('src/css/**/*')
	.pipe(sass({ style: 'expanded' }))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./docs/css'))
	.pipe(connect.reload());
});

//move html docs to /docs
gulp.task('html', function(){
   return gulp.src('src/*.html')
         .pipe(gulp.dest('./docs'))
         .pipe(connect.reload()); 
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('src/js/**/*')
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./docs/js'))
		.pipe(connect.reload());
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./docs/images'))
    .pipe(connect.reload());
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/css/**/*', ['styles']);

  // Watch .js files
  gulp.watch('src/js/**/*', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  gulp.watch('src/*.html', ['html']);
});

gulp.task('default', ['webserver','styles', 'scripts', 'watch']);