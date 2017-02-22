# Sigma - Frontend

[![Circle CI](https://circleci.com/gh/ProjetSigma/frontend.svg?style=svg)](https://circleci.com/gh/ProjetSigma/frontend)

## Licence
<a href="https://github.com/ProjetSigma/frontend/blob/master/LICENSE.md">
<img src="https://img.shields.io/badge/license-GNU%20Affero%20General%20Public%20License%20%28AGPL%29%20v3.0-blue.svg" alt="license" />
</a>

## Notes

This is a version of Sigma which uses Bootstrap and ng-bootstrap instead of Foundation for Sites.
ng-bootstrap is a library of UI components based on Bootstrap and Angular2.
See https://ng-bootstrap.github.io/#/components/ for details about each available component.


## Installation

Run `npm intall` to download and install all dependencies.
To avoid errors, be aware that :
* you don't have any other version of `angular-cli` installed, as it is now deprecated.  
The CLI is now officialy part of angular project is now accessible via `@angular/cli`
* you don't have deprecated packages in your `node_modules`, from last installations.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
```
npm start
```

Because it is cumbersome to launch both the frontend and backend server by hand, there is a tool called [`tmuxinator`](https://github.com/tmuxinator/tmuxinator) that can simplify your life. It requires to have `tmux` installed.

We assume that your frontend is in `~/sigma/frontend`, your backend is in `~/sigma/backend` and you have configured a python3 virtualenv called `.env` as described in the backend `README.md`. Then run `tmuxinator new sigma`. Go to the created file `~/.tmuxinator/sigma.yml` and fill it with this content:
```
name: sigma
root: ~/
windows:
  - editor:
      layout: main-horizontal
      panes:
        - cd ~/sigma/frontend
        - cd ~/sigma/backend && source .env/bin/activate && python manage.py runserver
        - cd ~/sigma/frontend && ng serve
```

After this, you'll just have to enter one command to get ready to develop:
```
tmuxinator sigma
```

## Logging in

To navigate on the site, fire up the backend server (see the [readme](https://github.com/ProjetSigma/backend)) and connect to the site using accounts from this list :
* admin@sigma.fr - admin

## Wiki
The wiki for the application is here : https://github.com/ProjetSigma/frontend/wiki

## Acknowledgments
Project structure based on [Angular2 seed sass](https://github.com/archfirst/angular2-seed-sass)
