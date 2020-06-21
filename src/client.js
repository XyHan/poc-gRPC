const PROTO_PATH = __dirname + '/protos/notes.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
const NoteService = grpc.loadPackageDefinition(packageDefinition).NoteService;
const client = new NoteService(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure()
)

module.exports = client;
