# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!--
  Starter scaffold — copy this into a new project's root as CLAUDE.md and
  fill in each section, or delete it and run Claude Code's own `/init`
  (or the `init` skill) once there's actual code to document.

  Keep it short. This file is loaded into every session's context, so
  every sentence should save a future Claude session a wrong guess or a
  round of exploration — not restate what's obvious from the code, and
  not list generic best practices ("write tests", "handle errors") that
  apply to any project.
-->

## What this is

[One or two sentences: what the project does and who it's for.]

## Commands

```bash
[install]
[dev / run]
[build]
[lint]
[typecheck]
[test — and how to run a single test]
```

## Architecture

[The "big picture" — how the pieces fit together, not a file-by-file
listing. Call out anything that requires reading multiple files to
understand: a shared data model multiple outputs render from, where
state lives, what's generated vs. hand-written, how requests flow through
layers. If a directory tree helps, keep it to the handful of top-level
directories that matter, with a one-line purpose each — skip anything
self-explanatory from its name.]

## Conventions

[Only project-specific conventions that aren't obvious from reading the
code — e.g. "content changes go in `data/`, not scattered across
components" or "this repo uses X pattern for Y, not the more common Z."
Delete this section if there's nothing non-obvious to say.]

## Gotchas

[Anything a past session (human or Claude) had to rediscover the hard
way — a deploy quirk, a footgun, an external service's odd behavior.
Delete this section if there aren't any yet.]
