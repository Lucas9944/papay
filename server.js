const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://lucasgenius95:W71qoOwF8I4w2kch@lucas.glhy18w.mongodb.net/Reja?retryWrites=true&w=majority";
mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
      console.log("MongoDB connnection succeed");
      module.exports = client;
      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The server is runing successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
