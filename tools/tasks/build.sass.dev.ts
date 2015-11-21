import {CSS_DEST, SCSS_DEPENDENCIES, SCSS_INDEX} from '../config';

export = function buildSassDev(gulp, plugins, option) {
  return function () {
    return gulp.src(SCSS_INDEX)
      .pipe(plugins.sass({includePaths: SCSS_DEPENDENCIES}).on('error', plugins.sass.logError))
      .pipe(gulp.dest(CSS_DEST));
  };
}
