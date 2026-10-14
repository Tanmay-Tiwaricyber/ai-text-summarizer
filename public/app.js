const sourceText = document.getElementById("sourceText");
const charCount = document.getElementById("charCount");
const summarizeBtn = document.getElementById("summarizeBtn");
const statusEl = document.getElementById("status");
const resultPanel = document.getElementById("resultPanel");
const summaryOutput = document.getElementById("summaryOutput");
const summaryLength = document.getElementById("summaryLength");

const exampleText = "A college coding club is planning a beginner-friendly workshop on Saturday. Participants will learn the basics of HTML, CSS, and JavaScript by building a simple personal webpage. Students should bring a laptop and install a code editor before the session. The organizers have not announced the exact start time or registration deadline yet.";

function updateCount() {
  charCount.textContent = `${sourceText.value.length.toLocaleString()} / 12,000`;
}
sourceText.addEventListener("input", updateCount);

document.getElementById("exampleBtn").addEventListener("click", () => {
  sourceText.value = exampleText;
  updateCount();
  sourceText.focus();
});

document.getElementById("clearBtn").addEventListener("click", () => {
  sourceText.value = "";
  updateCount();
  statusEl.textContent = "";
  statusEl.className = "status";
  resultPanel.classList.add("hidden");
  sourceText.focus();
});

summarizeBtn.addEventListener("click", async () => {
  const text = sourceText.value.trim();
  statusEl.className = "status";
  resultPanel.classList.add("hidden");

  if (!text) {
    statusEl.textContent = "Paste some text first.";
    statusEl.classList.add("error");
    sourceText.focus();
    return;
  }

  summarizeBtn.disabled = true;
  summarizeBtn.querySelector("span").textContent = "Summarizing...";
  statusEl.textContent = "Reading your text and preparing a summary…";

  try {
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, length: summaryLength.value })
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Could not summarize this text.");

    summaryOutput.textContent = data.summary;
    resultPanel.classList.remove("hidden");
    statusEl.textContent = "Summary ready. Check important details against the original text.";
  } catch (error) {
    statusEl.textContent = error.message || "Something went wrong. Please try again.";
    statusEl.classList.add("error");
  } finally {
    summarizeBtn.disabled = false;
    summarizeBtn.querySelector("span").textContent = "Summarize text";
  }
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(summaryOutput.textContent);
    document.getElementById("copyBtn").textContent = "Copied!";
    setTimeout(() => {
      document.getElementById("copyBtn").textContent = "Copy summary";
    }, 1400);
  } catch {
    statusEl.textContent = "Clipboard access failed. Select and copy the summary manually.";
    statusEl.classList.add("error");
  }
});

updateCount();