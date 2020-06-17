const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/helloworld.proto";
const os = require('os');
const name = process.env.NAME || os.hostname;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const hello_proto = grpc.loadPackageDefinition(packageDefinition);

var client = new hello_proto.Hello(
  `${process.env.GRPC_HOST || "0.0.0.0"}:${
    process.env.GRPC_SERVER_PORT || 50051
  }`,
  grpc.credentials.createInsecure()
);

client.sayHello({ name: name }, function (err, response) {
  if (err) {
    throw err;
  }
  console.log(response);
});
