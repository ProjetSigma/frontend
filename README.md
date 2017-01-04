# Sigma - Frontend

[![Circle CI](https://circleci.com/gh/ProjetSigma/frontend.svg?style=svg)](https://circleci.com/gh/ProjetSigma/frontend)

## Licence
<a href="https://github.com/ProjetSigma/frontend/blob/master/LICENSE.md">
<img src="https://img.shields.io/badge/license-GNU%20Affero%20General%20Public%20License%20%28AGPL%29%20v3.0-blue.svg" alt="license" />
</a>


## Installation

You'll need to install Node (version at leat 4.4.4) from [the Node.js website](https://nodejs.org/en/download/package-manager/). Once installed, check the version with `nodejs --version`. Then run the following commands inside the `frontend/` directory:
```bash
sudo npm install -g ts-node
npm install
```

If there is a failure at `npm install`, your Node.js version is too old or you have two versions of Node.js installed.

## Development server
We use angular-cli which integrate ts compilation, manage project configuration, run server.

run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

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
* user@sigma.fr / user
* denis.merigoux@sigma.fr / denis.merigoux
* camille.masset@sigma.fr / camille.masset
* hugo.tresentaux@sigma.fr / hugo.Tresentaux
* arthur.pesah@sigma.fr / arthur.pesah
You can connect to any account you see on the site by using the email adress / username pattern just like above.

## Wiki
The wiki for the application is here : https://github.com/ProjetSigma/frontend/wiki

## Acknowledgments
Project structure based on [Angular2 seed sass](https://github.com/archfirst/angular2-seed-sass)
