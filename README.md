# Technical Test - Docker Architecture and Node.js API
I had a great time working on this technical case. It allowed me to learn new things and deepen my docker skills. Overall i couldn't complete everything within the recommend time of 5 hours and had to push a little further, I still found it was a very valuable and enriching experience.

## Prerequisites
Make sure you have `pnpm` installed on your machine before proceeding.

### Run the Project
Clone the repo and navigate to the root directory.

Run the following command to start the docker containers:

(Each services will run in it's own container, here are the following port who need to be free: [80, 3000, 3001, 3002, 4222, 27017]

```bash
docker-compose up -d
```

The HTML file will be served at the following address -> `http://localhost:80`

you should modify the api url inside the html page to: `http://localhost:3000/api` (you only need to the port)
no need to change the websocket url (normally)

#### Connecting to MongoDB
To check if swipes are correctly inserted inside mongoDB, use the following URI:
```bash
mongodb://admin:1234@mongo:27017/yubo
```

## What's Next?
Here are some potential improvements for the next steps:
- Add unit and integration tests to ensure the reliability of the project.
- Refactor the package model to reduce the duplication of MongoDB-related information.
- Move the ws and nats package configurations to external packages that are still accessible within the monorepo.
- Reevaluate the server optimization issues, as I believe they were not fully explored in this test. Performance optimization is a key factor for ensuring a robust architecture in the long run.


## Outro

Again thank you for your time to check this technical test, thank you for your kindess over all step of this recruitement process.
Théo.
