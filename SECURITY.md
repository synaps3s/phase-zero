# Security

## Reporting something

Use GitHub's private vulnerability reporting:
[open a report](https://github.com/synaps3s/phase-zero/security/advisories/new).
It is private between you and the maintainers until there is a fix, which is
why it exists and why it is preferred here over an issue.

Please do not open a public issue for a vulnerability. Everything else,
including a wrong date or a broken link, belongs in a normal issue and is
genuinely welcome there.

There is no bug bounty. This is an unpaid project run in the open, and
pretending otherwise would waste your time.

## What this project is, in security terms

Phase Zero is a static site. Understanding that is most of the threat model.

- There is no backend, no database and no server-side code. Every page is
  generated at build time and served as a file.
- There are no accounts, no login, no passwords and no sessions.
- No personal data is collected, stored or transmitted. There is no analytics
  and no third-party script of any kind.
- What a reader has marked as watched is held in their own browser, in
  localStorage, and never leaves it. There is no request that carries it.
- The content security policy allows scripts only from this origin plus the
  exact inline scripts each build produces, named by hash. It allows no
  external host at all.

So the things usually worth attacking in a web application are not here.

## What is worth reporting

- A way to get script to run on the site: an injection through content, a hole
  in the build that lets authored text become markup, or a way around the
  content security policy.
- A dependency in `package.json` with a known vulnerability that actually
  reaches the built output. Dependabot watches for these already, so a report
  is most useful when it explains a path Dependabot does not see.
- Anything in the build or deploy workflows that would let somebody who is not
  a maintainer change what gets published.
- A secret committed by mistake. Push protection and secret scanning are on,
  but neither is perfect.
- A way to read or alter what a reader has stored in their browser from
  another site.

## What is not a vulnerability here

- A missing security header on a static file that carries no data.
- A wrong fact, a broken link or a stale date. Those are real problems and
  they belong in an issue, where they can be discussed and fixed in public.
- Anything that requires an attacker to already control the reader's machine
  or browser extensions.
- Denial of service against the host. The site is served by Cloudflare Pages
  and there is nothing here to exhaust.

## Which versions are supported

One: whatever is deployed at the address in the readme, which is always the
current `main`. There are no releases and no older versions to maintain.

## What you can expect

An acknowledgement when the report is read, and an honest answer about whether
it will be fixed and when. If a report turns out to be correct, credit in the
advisory unless you would rather not be named.
