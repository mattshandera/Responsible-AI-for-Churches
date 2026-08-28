# Security Policy

This is a static, client-side Next.js app. Per [`BUILDER.md`](./BUILDER.md),
there is no backend, no database, no API, and no server that ever sees a
user's answers — everything is generated in the browser and stored only in
that browser's `localStorage`. That significantly limits the attack
surface, but a few things are still worth reporting:

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
