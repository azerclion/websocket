import http from "http";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + `/views`);
app.use("/public", express.static(__dirname + `/public`));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () =>
  console.log(`✅ server start on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  // console.log(socket);
  console.log("connected to browser");
  socket.send("hello from server");
  socket.on("close", () => {
    console.log("disconnected from client");
  });
  socket.on("message", (message, isBinary) => {
    message = isBinary ? message : message.toString();
    console.log(message, isBinary);
  });
});
server.listen(3000, handleListen);
