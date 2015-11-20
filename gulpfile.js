// Gulp utils
var gulp           = require('gulp');
var gulpif         = require('gulp-if');
var filter         = require('gulp-filter');
var concat         = require('gulp-concat');
var env            = process.env.GULP_ENV;

// App compilation
var mainBowerFiles = require('main-bower-files');
var jshint         = require('gulp-jshint');
var uglifyjs       = require('gulp-uglify');
var sass           = require('gulp-sass');
var uglifycss      = require('gulp-uglifycss');

var webserver      = require('gulp-webserver');

var jsIncludes = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/foundation-sites/dist/foundation.js',
    'app/js/app.js',
    'app/js/*.js',
    'app/js/**/*.js',
];

var sassIncludes = [
    'bower_components/font-awesome/scss',
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src/'
];

var themesPath = 'app/sass/themes/';
var devThemes = ['classic.scss', 'classic-dark.scss'];

/**
 * Liste les fichiers d'un répertoire
 * @param  {string} dir Le dossier
 * @return {string[]}   La liste des fichiers
 */
function getFiles(dir) {
    return fs
        .readdirSync(dir)
        .filter(function(file) {
            return !fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('build-sass', function() {
    var themeFiles;

    if (env == 'prod') {
        themeFiles = getFiles(themesPath);
    } else {
        themeFiles = devThemes;
    }

    var tasks = themeFiles.map(function(file) {
        return gulp
            .src(themesPath + file)
            .pipe(filter(['**/*.css', '**/*.scss']))
            .pipe(sass({includePaths: sassIncludes}).on('error', sass.logError))
            .pipe(concat(file.replace(/scss/, '') + 'min.css'))
            .pipe(gulpif(env === 'prod', uglifycss()))
            .pipe(gulp.dest('www/themes/'))
        ;
    });

});

gulp.task('build-js', function() {
    return gulp
        .src(jsIncludes)
        .pipe(filter(['**/*.js']))
        .pipe(concat('app.min.js'))
        .pipe(gulpif(env === 'prod', uglifyjs()))
        .pipe(gulp.dest('www/'))
    ;
});

gulp.task('lint-js', function() {
    var appFiles = [
        'app/js/app.js',
        'app/js/*.js',
        'app/js/**/*.js',
    ];
    return gulp
        .src(appFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
    ;
});

gulp.task('copy-fonts', function () {
    return gulp
        .src(['bower_components/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(filter(['***.eot', '***.svg', '***.ttf', '***.woff', '***.woff2', '***.otf']))
        .pipe(gulp.dest('www/fonts/'))
    ;
});

gulp.task('serve', function() {
    gulp
        .src('www')
        .pipe(webserver({
            host:             'localhost',
            port:             '9000',
            livereload:       true,
            directoryListing: false
        }))
    ;
});

gulp.task('watch', function() {
    gulp.watch(['app/js/**/*.js', 'app/js/*.js'], ['lint-js', 'build-js']);
    gulp.watch('app/sass/*.scss', ['build-sass']);
});
gulp.task('build', ['build-js', 'build-sass', 'copy-fonts']);
gulp.task('start', ['watch', 'serve']);
gulp.task('default', ['build', 'start']);
