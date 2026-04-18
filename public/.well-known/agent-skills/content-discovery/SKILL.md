---
name: content-discovery
description: Discover content feeds and machine-readable metadata published by adrianub.dev.
---

# Content Discovery

Use this skill when an agent needs machine-readable discovery endpoints.

## Key Endpoints

- `/.well-known/api-catalog`
- `/.well-known/openid-configuration`
- `/.well-known/oauth-authorization-server`
- `/.well-known/oauth-protected-resource`
- `/rss.xml`
- `/robots.txt`

## Guidance

1. Prefer well-known endpoints for automated discovery.
2. Use `/rss.xml` for feed-based ingestion.
3. Respect robots and content-signal directives before fetching content.
