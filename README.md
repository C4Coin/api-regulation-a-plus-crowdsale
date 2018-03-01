# api-regulation-a-plus-crowdsale

[![Greenkeeper badge](https://badges.greenkeeper.io/C4Coin/api-regulation-a-plus-crowdsale.svg)](https://greenkeeper.io/)

The API that interfaces between C4Coin's Regulation A+ Crowdsale website and smart contracts

The main C4Coin Public facing website

* `develop` — [![CircleCI](https://circleci.com/gh/C4Coin/api-regulation-a-plus-crowdsale/tree/develop.svg?style=svg)](https://circleci.com/gh/C4Coin/api-regulation-a-plus-crowdsale/tree/develop) [![codecov](https://codecov.io/gh/C4Coin/api-regulation-a-plus-crowdsale/branch/develop/graph/badge.svg)](https://codecov.io/gh/C4Coin/api-regulation-a-plus-crowdsale)
* `master` — [![CircleCI](https://circleci.com/gh/C4Coin/api-regulation-a-plus-crowdsale/tree/master.svg?style=svg)](https://circleci.com/gh/C4Coin/api-regulation-a-plus-crowdsale/tree/master) [![codecov](https://codecov.io/gh/C4Coin/api-regulation-a-plus-crowdsale/branch/master/graph/badge.svg)](https://codecov.io/gh/C4Coin/api-regulation-a-plus-crowdsale)

## Functional Requirements

_add details_

### API Routes

#### `GET /ping`

Returns a heartbeat response.

    {
      "response": "okay"
    }

#### `GET /api/v1`

_fill the rest of this in_

## Development

_add details_

### Development Prerequisites

* [NodeJS](htps://nodejs.org), version 9.5+ (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)
* [Docker](https://www.docker.com) (Use [Docker for Mac](https://docs.docker.com/docker-for-mac/), not the homebrew version)
* _add other details_

### Initialisation

    npm install

### To Start the API server while working on API clients.

    docker-compose up -d

Runs the database and server within docker, exposing the API on port `3001`.

### To Start the server to work on the server itself

    npm install

Run `docker-compose up -d db` to only start Postgres,

Then run `npm start` to start the api server on port `3000`

### Seed some data

With the database running, run

    I_KNOW_WHAT_I_AM_DOING=true npm run seed

### Test it

run `docker-compose up db -d` to only start Postgres, then:

* `npm test` — runs the unit tests (quick)
* `npm run test:db` — runs the database tests (not so quick)
* `npm run test:server` — runs the API endpoint tests (not so quick)
* `npm run test:db` — runs all the tests (slowest of all)

### Lint it

    npm run lint

## Deployment

The site will be deployed automatically to [heroku](https://heroku.com) once CircleCI has cleared a merge to either `develop` (staging server) or `master` (production).

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
