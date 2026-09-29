# Security Policy

This is a client-side Next.js app. Per [`BUILDER.md`](./BUILDER.md),
there is no database, and everything is generated in the browser and stored
only in that browser's `localStorage`. The one exception is the optional
"Get an AI review" button, which sends the drafted document to a single
server route (`app/api/grade`) that forwards it to the Anthropic API and
stores nothing. That significantly limits the attack surface, but a few
things are still worth reporting:

- Abuse or bypass of the `app/api/grade` route (rate limiting, size limits,
  prompt injection that changes the shape of its response, or any way to
  read the server's API key)

- A vulnerability in a dependency (`npm audit` finding with a real
  exploit path in this app)
- An XSS or injection issue in how the builder renders answers into the
  Markdown/PDF/preview output
- Anything that would let a page exfiltrate data out of the browser that
  shouldn't leave it

## Reporting

Please report security issues privately rather than opening a public
issue: email **matt.shandera@gmail.com**, or use
[GitHub's private vulnerability reporting](https://github.com/mattshandera/Responsible-AI-for-Churches/security/advisories/new)
for this repo.

This is a solo-maintained project — there's no formal SLA, but reports
will be acknowledged and looked at as soon as reasonably possible.
