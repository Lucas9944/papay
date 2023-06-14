const dotenv = require("dotenv");
dotenv.config(); // require qilgandan so'ng, dotenv config bir xil kelgan shuning uchun hard doim birga yozishimiz shart!
const http = require("http");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false); /// error bermasliggi uchun 

const connectionString = process.env.MONGO_URL; /// 
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, goose) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
      console.log("MongoDB connnection succeed");
      // console.log(goose);
      const app = require("./app");
      const server = http.createServer(app);
      let PORT = process.env.PORT || 3003;
      server.listen(PORT, function () {
        console.log(
          `The server is runing successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
