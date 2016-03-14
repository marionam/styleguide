var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefix = require("gulp-autoprefixer");

gulp.task("sass", function() {
	return gulp.src("src/scss/*.scss")
		.pipe(sass())
		.pipe(autoprefix({browsers: ["last 2 versions", ">1%"] }))
		.pipe(gulp.dest("dist/css"));

});