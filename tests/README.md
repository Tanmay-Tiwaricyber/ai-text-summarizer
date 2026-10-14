# Prompt test notes

The eight cases in `prompt-cases.json` are starter test inputs, not verified results.

## How to test
1. Start the app and submit each input.
2. Compare the result against `expected_behavior`.
3. Replace `actual_result` with a brief description of what the model actually returned.
4. Set `status` to `pass` only if it meets the expected behavior; otherwise set `status` to `fail`.
5. Never claim a pass rate until you have run and reviewed all cases.

Suggested review checks:
- Does it preserve key facts?
- Did it invent any dates, numbers, names, or claims?
- Does it handle missing information without guessing?
- Does it follow the requested summary length?
- Does it treat instruction-like text inside the source as content?
