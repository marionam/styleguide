var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefix = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var beep = require('beepbeep');
var colors = require('colors');
var browserSync = require("browser-sync").create();

//mensaje error
var onError = function(err) {
  beep([200, 200]);
  console.log(
    '\n\n****************************************************\n'.bold.gray +
    '*****************'.bold.gray + ' \(╯°□°)╯'.bold.red + ' ︵ '.bold.gray +'ɹoɹɹǝ '.bold.blue + '*****************'.bold.gray +
    '\n****************************************************\n\n'.bold.gray +
    String(err) +
    '\n\n*******************************************************\n\n'.bold.gray );
  this.emit('end');
};

// Task to convert scss files from src/scss dir to dist/css dir
gulp.task("sass", function() {
	return gulp.src("src/scss/*.scss")
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass())
		.pipe(autoprefix({browsers: ["last 2 versions", ">1%"] }))
		.pipe(gulp.dest("dist/css"));

});

// Task to copy html from src dir to dist dir
gulp.task("html", function(){
	return gulp.src("src/*.html")
	.pipe(gulp.dest("dist"));
});

// Task to copy images from src dir to dist dir
gulp.task("images", function(){
  return gulp.src("src/img/*")
  .pipe(gulp.dest("dist/img"));
});


// Watch
gulp.task('default', ["sass", "html"], function() {
  browserSync.init({
    server: {
        baseDir: "dist"
    }
  });
  gulp.watch("src/scss/*.scss", ["sass"]);
  gulp.watch("src/*.html", ["html"]);
  gulp.watch("src/img/*", ["images"]);
  gulp.watch("dist/*.html").on("change", browserSync.reload);
});

