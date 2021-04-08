# Mono Test

My solution to the mono assessment

### Prerequisites

Node.js
Run `yarn`
Then `yarn dev`

## Running the tests

Run `yarn test`

## Code cleanup

Run `yarn lint:fix`

## N.B

please use a mongodb replica set as your DB_URI, mongodb transactions are used and they are not supported yet on standalone nodes

## Docs

Run `yarn docs` to generate docs.
Then open `index.html` on the `docs/` folder that will be created in the root folder as a result of the command.

## Built With

* [Node.js](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
