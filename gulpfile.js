const gulp        = require('gulp'),
      browserSync = require('browser-sync'),
      sass = require('gulp-sass')(require('sass')),
      rename = require("gulp-rename"),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"   //путь откуда будет запускаться  server
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("dist/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))//компилируем, сжимаем
        .pipe(rename({
            prefix: "",
            suffix: ".min",
          }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))//кладём в src/css
        .pipe(browserSync.stream());//после запускаем снова server
});

gulp.task('watch', function() {
    gulp.watch("dist/sass/**/*.+(scss|sass)", gulp.parallel('styles'));//следит за обновлением файлов
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));