const ws = new WebSocket(`ws://localhost:3000`);
document.addEventListener('DOMContentLoaded', function (){
  if (Notification.permission !== "granted") Notification.requestPermission();
});
const user = prompt("Ingrese su usuario");

if (user) {
  ws.onopen = () => ws.send(JSON.stringify({user, text: "", type:"connected"}))
}

const generateDate = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
  };

  const log = document.getElementById("log");

  document.querySelector("button").onclick = () => {
    let text = document.getElementById("text").value;
    ws.send(JSON.stringify({text, user, type:"message"}));
    log.innerHTML += generateDate() + " You: " + text + "<br>";
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data)
    messageUser(message);
    connectedUser(message);
  };
  ws.onerror = (error) => {
    console.log("Server error message: ", error.message);
  };

  function messageUser(message){
    if (message.type === "message" || message.type === "welcome"){
      log.innerHTML +=generateDate() + " " + message.user + ": " + message.text + "<br>";
    }
  }

  function connectedUser(message) {
    if (message.type === "connected"){
      notify(message.user + " Connected!");
    }
  }

  function notify(message) {
    if (Notification.permission !== 'granted' ) {
      Notification.requestPermission();
    } else {
      new Notification(message);
    }
  }