const PROTO_PATH = './helloworld.proto';
const grpc = require("grpc");
const fs = require("fs");
const protoLoader = require("@grpc/proto-loader");
const HOST = process.env.GRPC_HOST || "0.0.0.0";
const PORT = process.env.GRPC_SERVER_PORT || 50051;
const googleJwt = require("./google-jwt.js");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

let credentials = grpc.ServerCredentials.createSsl(
  fs.readFileSync("./server_certs/ca_bundle.crt"),
  [
    {
      cert_chain: fs.readFileSync("./server_certs/certificate.crt"),
      private_key: fs.readFileSync("./server_certs/private.key"),
    },
  ],
  true
);

const hello_proto = grpc.loadPackageDefinition(packageDefinition);

function formatJwt(token) {
  if (!token || token.lenght == 0) {
    const msg = 'Missing JWT';
    console.error(msg);
    throw msg;
  }
  let formattedToken = JSON.parse(token[0].split(" ")[1]);
  console.info("split", formattedToken.id_token);
  return formattedToken.id_token;
}


sayHello = (call, callback) => {
  let token = formatJwt(call.metadata._internal_repr.token);
  console.info(token);
  googleJwt.verifyToken(token).then((ticket) => {
    console.info(`sayHello ticket: ${JSON.stringify(ticket)}`);
    callback(null, { message: "Hello " + call.request.name });
  });
};

main = () => {
  var server = new grpc.Server();
  server.addService(hello_proto.Hello.service, {
    sayHello: sayHello,
  });
  server.bind(`${HOST}:${PORT}`, credentials);
  server.start();
  console.info(`started service host: ${HOST} on port: ${PORT}`);
};

function formatJwt(jwt) {
  let formattedToken = JSON.parse(jwt[0].split(" ")[1]);
  console.log("split", formattedToken.id_token);
  return formattedToken.id_token;
}

main();
