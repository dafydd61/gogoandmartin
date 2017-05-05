const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const scripts = [
	'./app/js/p.js',
	'./app/js/script.js'
];

gulp.task('js', () => {
	return gulp.src(scripts)
		.pipe(concat('main.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./app/js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', () => {
	return gulp.src('./app/sass/style.scss')
	.pipe(sass())
	.pipe(gulp.dest('./app/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('watch', ['browserSync', 'sass'], () => {
	gulp.watch('./app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('./app/js/**/*.js', ['js', browserSync.reload]);
});

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: './app'
		},
	});
});

gulp.task('default', () => {
	console.log("Running default");
});