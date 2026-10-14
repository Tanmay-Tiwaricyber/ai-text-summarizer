# Briefly — AI Text Summarizer

A simple web app that turns long text into concise key points using an AI language model. Built as a beginner-friendly Prompt Engineering project.

## Features

- Summarize pasted notes, articles, and announcements.
- Choose a short or detailed summary.
- Copy the result with one click.
- Prompt rules discourage invented facts and ask the model to preserve the source meaning.
- Handles empty input, overly short text, overly long text, missing API configuration, and API errors.
- API key stays on the server; it is not sent to the browser.

## Demo flow

1. Start the app and open `http://localhost:3000`.
2. Paste text or click **Try an example**.
3. Choose a summary length.
4. Click **Summarize text**.
5. Review and copy the summary; verify important facts against the source.

## Tech stack

- HTML, CSS, JavaScript
- Node.js and Express
- Groq API (OpenAI-compatible chat completions endpoint)

## Run locally

Requirements: Node.js 18 or newer and a Groq API key.

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ai-text-summarizer.git
   cd ai-text-summarizer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and add your API key:
   ```env
   GROQ_API_KEY=your_actual_key_here
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000`.

Never commit `.env` or publish your API key. `.gitignore` excludes `.env`.

## Prompt engineering

The main prompt is stored in [`prompts/summarizer.txt`](prompts/summarizer.txt). It defines the role, task, limits, and success rule. The server uses a matching prompt when calling the model.

### Success criteria

A summary should:
- Preserve important points and source meaning.
- Avoid unsupported facts, dates, names, numbers, and claims.
- Follow the selected length.
- Clearly flag unclear or missing information rather than guessing.

## Prompt tests

Eight realistic starter cases are included in [`tests/prompt-cases.json`](tests/prompt-cases.json). They cover general information, schedules, missing details, Hinglish, instruction-like text embedded in a source, and small-sample results.

**Important:** These are test inputs and expected behaviors, not claimed results. Run each case against the live app, record the actual output, and mark `pass` or `fail` only after reviewing it. Do not report an accuracy percentage until the tests have actually been run.

Test review guidance is in [`tests/README.md`](tests/README.md).

## Known limitations

- Summaries can still omit or misinterpret details; verify important information against the source.
- Requires an internet connection and a valid Groq API key.
- The current starter app does not store summaries or user accounts.
- Very long inputs are limited to 12,000 characters.
- No formal benchmark or verified pass rate is claimed yet.

## Project structure

```text
ai-text-summarizer/
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── prompts/
│   └── summarizer.txt
├── tests/
│   ├── prompt-cases.json
│   └── README.md
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Before submitting

- [ ] Add your GitHub username and repository URL where needed.
- [ ] Run the app locally with your own API key.
- [ ] Test all eight cases and record real outcomes.
- [ ] Take a screenshot or record a short demo.
- [ ] Confirm `.env` and API keys are not in the repository.
- [ ] Replace this checklist with completed, truthful evidence before claiming the project is finished.

## License

MIT — see `LICENSE`.
