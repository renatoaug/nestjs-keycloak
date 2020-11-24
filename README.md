## Description

This project is a nestjs implementation of keycloak.

## Installation

```bash
➜ nvm use
➜ npm install
```

## Running the app

Make sure the docker is running:

```bash
➜ docker-compose up -d
```

Then run:

```bash
➜ npm run start:dev
```

## Test

```bash
➜ npm run test
```

## Additional info

- To see the GraphQL documentation opens the [playground](http:localhost:3000/graphql);
- The authorization token must be sent as a header in the format: `Authorization: "Bearer YOUR_ACCESS_TOKEN"`.
