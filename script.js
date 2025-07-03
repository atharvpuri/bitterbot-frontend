const startBtn = document.getElementById("startBtn");
const urlInput = document.getElementById("url");
const durationInput = document.getElementById("duration");
const statusText = document.getElementById("status");
const logOutput = document.getElementById("logOutput");

// 🌐 Set this to your deployed backend later
const API_URL = "http://localhost:3000/api/start"; // 🔁 Change to Render URL when deployed

startBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  const duration = parseInt(durationInput.value.trim());

  // ✅ Input Validation
  if (!url || isNaN(duration) || duration <= 0) {
    statusText.textContent = "⚠️ Please enter a valid URL and time.";
    return;
  }

  // UI Feedback
  statusText.textContent = "⏳ Sending to BitterBot backend...";
  log(`⏳ Deploying bot to ${url} for ${duration} minute(s)...`);

  // 🔁 Send data to backend
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url, duration })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        statusText.textContent = "❌ Error: " + data.error;
        log(`❌ ${data.error}`);
      } else {
        statusText.textContent = "✅ Bot successfully started!";
        log(`✅ ${data.message}`);
      }
    })
    .catch(err => {
      statusText.textContent = "❌ Failed to connect to backend.";
      log(`❌ ${err.message}`);
    });
});

// 📜 Utility for Logging to Output Box
function log(msg) {
  const line = document.createElement("div");
  line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  logOutput.appendChild(line);
  logOutput.scrollTop = logOutput.scrollHeight;
}
