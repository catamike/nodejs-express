var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
 
gulp.task('css', function () {
    return gulp.src('public/stylesheets/style.css')
        .pipe($.csso())
        .pipe(gulp.dest('public/dist/css'));
});

// Lint javascript
gulp.task('lint', function(){
	return gulp.src('routes/*.js')
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish'));
});