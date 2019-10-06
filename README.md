## TrainTrack

[![Netlify Status](https://api.netlify.com/api/v1/badges/56e7dcca-dca3-4516-bfec-a1fead6ee773/deploy-status)](https://app.netlify.com/sites/train-track/deploys)

Keeping the world on track with _TrainTrack_!

## Setup

Install mongodb locally (Mac):

```
brew tap mongodb/brew
brew install mongodb-community@4.0
```

To run mongodb once:

```
mongod --config /usr/local/etc/mongod.conf
```

To run mongodb started at login:

```
brew services start mongodb/brew/mongodb-community@4.0
```

#### Environment

We use [direnv] to autoload exported secrets from `.envrc` file, each time you enter in this project's folder.

Run `direnv allow` after each time secrets are changed in `.envrc` (development secrets only).

[direnv]: https://direnv.net/

## Babel/webpack compilation

All functions are compiled with webpack using the Babel Loader, so you can use modern JavaScript, import npm modules, etc., without any extra setup.


## Local Development

Before developing, clone the repository:
```
git clone https://github.com/Ledgy/TrainTrack
```

Navigate into the newly created TrainTrack directory, and run:
```
brew install yarn
brew install netlify-cli
npm install
```

To start your app server, run:
```
netlify dev
```

This will open a local server running at `http://localhost:3000` with your app

Install `netlify` client:

```
npm install netlify-cli -g
```

To run both lambda functions and the app dev server:

```
netlify dev
```

### Run the functions dev server

From inside the project folder, run `yarn` to install all dependencies and then:

```
yarn start:lambda
```

This will open a local server running at `http://localhost:9000` serving your Lambda functions, updating as you make changes in the `src/lambda` folder.

You can then access your functions directly at `http://localhost:9000/{function_name}`, but to access them with the app, you'll need to start the app dev server.

### Run the app dev server

While the functions server is still running, open a new terminal tab and run:

```
yarn start
```

This will start the normal create-react-app dev server and open your app at `http://localhost:3000`.

Local in-app requests to the relative path `/.netlify/functions/*` will automatically be proxied to the local functions dev server.

### Test function individually

Make sure, that all required servers are running as outlined above. To test the
login callback you can then run the following. Please note, that `netlify` does
not fully mock the user metadata yet.

```
netlify functions:invoke --name identity-login --identity
```

