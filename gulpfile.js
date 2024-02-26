const gulp = require("gulp"),
  minifyCSS = require("gulp-clean-css"),
  renameCSS = require("gulp-rename"),
  sass = require("gulp-sass")(require("sass")),
  minifyJS = require("gulp-minify");

// minCSS
gulp.task("mincss", async function () {
  gulp
    .src("./css/*.css")
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(renameCSS({ suffix: ".min" }))
    .pipe(gulp.dest("./public/css"));
});

//minJS
gulp.task("minjs", async function () {
  gulp.src("./js/*.js").pipe(minifyJS()).pipe(gulp.dest("./public/js"));
});

// Watch
gulp.task("default", gulp.series(
        "mincss",
        "minjs"
));
