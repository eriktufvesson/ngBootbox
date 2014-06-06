var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var rename = require('gulp-rename');

gulp.task('default', function() {
    gulp.src('ngBootbox.js')
        .pipe(gulp.dest('dist'))
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(rename('ngBootbox.min.js'))
        .pipe(gulp.dest('dist'))
});
