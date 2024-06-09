# Flywheel Web Service

The mighty Flywheel Trading app's frontend service. Its primary purpose is to let the user view and interact with their data through the browser.

# How to launch this service

You can run this service using npm or docker.

### Using npm

First, launch flywheel-data-service first. Follow the instruction at https://github.com/chohanbin/flywheel-data-service/blob/main/README.md

Create `.env` file to:

- Store a secret that the user authentication service should use. Generate the secrete with `openssl rand -base64 32` then set it as the value for `AUTH_SECRET`
- Specify the address of the data service (`http://localhost:4000/graphql` by default).

```shell
# .env
AUTH_SECRET=your-secret-key
DATA_SERVICE_ADDRESS="http://localhost:4000/graphql"
```

From the repo root directory, invoke:

```shell
npm install   # Only needs to be run once.
npm run dev     # Run every time the service needs to start.
```

Shut down the service with `Ctrl + D`.

### Using docker

First, run flywheel-data-service as a docker container, with alias `--name data-service`.
Follow [this instruction](https://github.com/chohanbin/flywheel-data-service/blob/main/README.md#using-docker).

Then, build the image for this service with:

```shell
docker build -t flywheel-web-service .
```

Then run the container from that image:

```shell
docker run --name web-service \   # the name that this service will be known to other services on 'flywheel' network
  --network flywheel \
  -dp 127.0.0.1:3000:3000 \
  -e DATA_SERVICE_ADDRESS='http://data-service:4000/graphql' \    # targeting the data-service container
  flywheel-web-service
```

Shut down the service, by first identifying the container ID:

```shell
docker ps | grep flywheel-web-service
```

Then run ([Explanation](https://docs.docker.com/get-started/03_updating_app/#remove-a-container-using-the-cli) of `docker rm -f`):

```shell
docker rm -f <target docker container ID>
```

# How to run automated test

From the repo root directory, invoke:

TODO: TBD

# Author

Hanbin Cho
