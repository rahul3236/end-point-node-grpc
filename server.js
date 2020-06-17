const PROTO_PATH = "./helloworld.proto";
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const hello_proto = grpc.loadPackageDefinition(packageDefinition);

function sayHello(call, callback) {
  callback(null, { message: "Hello " + call.request.name });
}

function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Hello.service, { sayHello: sayHello });
  server.bind(
    `${process.env.GRPC_HOST || "0.0.0.0"}:${
      process.env.GRPC_SERVER_PORT || 50051
    }`,
    grpc.ServerCredentials.createInsecure()
  );
  server.start();
}

main();
