# GRPC End-Point


## Development

* Clone the repo
* Change the directory
* Install dependencies: `yarn install`
* To run locally: `npm start`

## Docker

* Install docker using a method suitable for your operating system
* Run `sudo docker build -t grpc-end-point .` to build the docker image
* Run `sudo docker run -d -rm -p 50051:50051 grpc-end-point` to run the container

## Environment Variables

* GRPC_HOST => Host on which grpc server will runs defaults to 0.0.0.0* 
* GRPC_SERVER_PORT => Port on which grpc server runs defaults to 50051

## Testing 

* Running local
* Sample Code to test the server is located inside client.js file
* To run the sample code, change to clone repo and run: `node client.js`
* Server must be started before running the sample code
