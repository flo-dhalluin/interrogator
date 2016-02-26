var gulp = require('gulp');
var concat = require('gulp-concat');
var server = require('gulp-webserver');
var bower = require('gulp-bower');

gulp.task('bower', function() {
    return bower()
	.pipe(gulp.dest('dist/bower_components/'));
});

gulp.task('js', function() {
    gulp.src(['app/src/**/*.module.js', 'app/src/**/*.js', 'app/src/main.js'])
	.pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('views', function() {
    gulp.src(['app/**/*.html'])
	.pipe(gulp.dest('dist/'))
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['js']);
    gulp.watch('app/**/*.html', ['views']);
});

gulp.task('serve', ['bower', 'watch'], function() {
    gulp.src('dist')
        .pipe(server({
	    livereload: true,
	    open: true
	}));
});

gulp.task('default', ['js', 'views']);
