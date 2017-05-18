# WARP Restaurant Guide App

## Environment
Nodejs - v6.10.0 (Latest LTS release)
npm - v3.10.10

## Libraries used
- Restify (Http client)
- Express (REST Api)
- Mongodb (Database)
- Swagger (Documentation)

## Usage
1. Clone the repo from Github
2. Run command 'cd restaurantguide'
3. Run npm install && npm start
4. Application is served on http://localhost:8080/app/

The API can be accessed on port 8080.

## Documentation
Swagger has been used for Documentation.

## CI Implementation
CI can be implemented using Jenkins and github hooks. The github repo needs to be configured in a way that it will fire the jenkins task after each commit to the code. Jenkins task will download the source code and run npm install to download any dependencies.
Jenkins will then restart the node.js instance running on the linux box. PM2 is a production grade nodejs manager which can be used for managing nodejs instances. Liniting tools can be added to the build chain to check for code quality. After downloading the code and dependencies jenkins should restart the PM2 instance to reboot the server.

## Deployment
Following tools are required for deploying on a Linux server:
Linux box - CentOs 6
Github client - Managing source code
PM2 - Production grade nodejs manager (should be used to restart/stop node instances)
Redis - Caching
Jenkins - Deployment and automation
JsLint - Linting

PM2 should be used to spawn multiple node instances running the same code. PM2 can be run on EC2 instances in case of AWS. Care should be taken that node instances are not running with superuser rights for security concerns. A load balancer should be configured in such a way that it can accept and respond to requests from several nodejs instances running the same code base. There are different modes in which the load balancer can be configured. Most obvious one is round robin pattern. An Nginx  server can also be used to serve static files. Everytime code is pushed in to Github repo it will automatically trigger the jenkins task. The jenkins task will then download the updated files and dependencies and restart nodejs instances using PM2. 

Zero downtime can be achieved when deploying code.


## Todo
Things that I would have liked to do but unable to do it because of lack of time :
- Better project structure and seperation of concerns
- Linting of business logic
- Unit tests using Mocha
- Authentication
- Move tokens and keys to config directory
- Remove some extra code and unused libs