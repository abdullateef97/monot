# WonderQ: Message Broker

My implementation of a message broker. Messages can be created, fetched and confirmed as processed. However if the confirmation does not happen within a specific amount of time, the message is re-entered into of the queue.

### Prerequisites

Node.js
Run `yarn`
Then `yarn dev`


## Running the tests

Run `yarn test`

## Code cleanup
Run `yarn lint:fix`

## API

## Service Endpoints

* `GET /v1/messages/`
* `POST /message/`
* `PUT /messages/confirm/`

## Docs
Run `yarn docs` to generate docs.
Then open `index.html` on the `docs/` folder that will be created in the root folder as a result of the command.

## Built With

* [Node.js](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
