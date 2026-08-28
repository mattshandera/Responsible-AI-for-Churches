# Contributing

Thanks for helping improve this. It's a small, solo-maintained project, so
the process is intentionally light.

## Proposing a change

1. Fork the repo and create a branch off `main`.
2. Make your change. See [`CLAUDE.md`](./CLAUDE.md) for how the codebase
   is put together — in particular, the generated document's content
   (principles, use cases, wording) lives in `lib/`, not scattered across
   components.
3. Run the checks locally:

   ```bash
   npm install
   npm run build
   npm run lint
   npm run typecheck
   ```

   There's no automated test suite yet, so also click through the change
   in the browser (`npm run dev`) if it touches the UI.
4. Open a pull request against `main`. The PR template will walk you
   through what to include.

## Changing the principles themselves

The 18 principles are adapted from the [`README.md`](./README.md) document
under CC BY-SA 4.0 — see [`ABOUT.md`](./ABOUT.md) for the license terms.
If you're proposing a substantive change to the principles' wording or
intent (not just the builder's code), open an issue first so it can be
discussed before you put work into it.

## Reporting bugs or requesting features

Use the issue templates — they'll prompt for what's needed.
