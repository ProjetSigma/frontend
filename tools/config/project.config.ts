import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
    'node_modules/font-awesome/fonts/**'
  ];

  constructor() {
    super();
    this.APP_TITLE = 'Projet Sigma';
    this.SASS_OPTIONS.includePaths = [
        'node_modules/foundation-sites/scss',
        'node_modules/motion-ui/src',
        'node_modules/font-awesome/scss'
    ];
    this.BOOTSTRAP_MODULE = this.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main';
    this.ASSETS_SRC = `${this.APP_SRC}/shared/assets/`;

    let additional_deps: InjectableDependency[] = [
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);
  }
}
