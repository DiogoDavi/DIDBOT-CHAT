const ws = new WebSocket("wss://didbot-server.onrender.com");

const chatBox = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

function formatText(text) {
  let formatted = text;

  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<br><br><strong>$1</strong><br>");

  formatted = formatted.replace(/(\d+\.)/g, "<br><strong>$1</strong> ");

  formatted = formatted.replace(/ {2,}/g, " ");

  formatted = formatted.replace(/<br><br><br>/g, "<br><br>");

  return formatted.trim();
}

function addMessage(message, sender) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "user-message" : "bot-message";
  div.innerHTML = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  ws.send(text);
  input.value = "";
};

ws.onmessage = (event) => {
  const formatted = formatText(event.data);
  addMessage(formatted, "bot");
};

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
