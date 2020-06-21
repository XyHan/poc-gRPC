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
const notesProto = grpc.loadPackageDefinition(packageDefinition);
const note = { id: 1, title: 'New Note', content: 'New Note Content' };
const notes = [];
const server = new grpc.Server();
const uuid = require('uuid');

server.addService(notesProto.NoteService.service, {
    get: (call, callback) => {
        note.id === call.request.id ? callback(null, note) : callback({ code: grpc.status.NOT_FOUND, details: 'Not Found' });
    },
    insert: (call, callback) => {
        let note = call.request;
        note.id = uuid.v1();
        notes.push(note);
        callback(null, note);
    },
    delete: (call, callback) => {
        let existingNoteIndex = notes.findIndex((n) => n.id === call.request.id);
        if (existingNoteIndex !== -1 ){
            notes.splice(existingNoteIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            });
        }
    },
    update: (call, callback) => {
        if (note.id === call.request.id) {
            note.title = call.request.title;
            callback(null, note);
        } else {
            callback({ code: grpc.status.NOT_FOUND, details: 'Not Found' });
        }
    },
})
server.bind(
    '127.0.0.1:50051',
    grpc.ServerCredentials.createInsecure()
)

console.log('GRPC server running at localhost:50051');
server.start();
