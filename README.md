# GRPC End-Point


## Development

* Clone the repo
* Change the directory
* Install dependencies: `yarn install`
* To run locally: `npm start`

## Docker

* Install docker using a method suitable for your operating system
* Run `sudo docker build -t grpc-endpoint .` to build the docker image
* Run `sudo docker run -d --rm -p 50051:50051 grpc-endpoint` to run the container
* Publish to GCP Container Registry:
```
PROJECT_ID=level01
IMAGE_NAME=grpc-endpoint
docker tag ${IMAGE_NAME} gcr.io/${PROJECT_ID}/${IMAGE_NAME}
docker push gcr.io/${PROJECT_ID}/${IMAGE_NAME}
```

## Environment Variables

* GRPC_HOST => Host on which grpc server will runs defaults to 0.0.0.0* 
* GRPC_SERVER_PORT => Port on which grpc server runs defaults to 50051

## Testing 

* Running local
* Sample Code to test the server is located inside `./test/client.js` file
* To run the sample code: `node ./test/client.js`
* Server must be started before running the sample code
