const PORT = process.env.PORT || 3000;
const WebSocketServer = require("ws").Server; // here we are using WS library
const wss = new WebSocketServer({ port: `${PORT}` });

wss.on("connection", (ws) => {
    console.log("Connection opened 🚀");
    ws.send(JSON.stringify({user: "", text: "Codeable's chat connected 🚀", type: "welcome"}));
    ws.on("message", (message) => {
      wss.clients.forEach((client) => {
        if (client != ws) client.send(message);
      });
    });
    // New code here ⬇
    ws.on("close", () => {
      console.log("Connection closed 💀");
    });
    // ---------------
  });