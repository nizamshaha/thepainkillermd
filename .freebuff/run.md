# THE PAINKILLER MD — Preview Run Doc

## Reproduce artifacts
No env files required. Dependencies are already installed (`node_modules` present).

If starting fresh:
1. `npm install` (uses npm, package-lock.json present)

## Run the server
```bash
npm run dev
```
Default port: **3000** (Next.js default, no .env override needed).

Detached on Windows (PowerShell):
```
powershell -NoProfile -Command "(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id"
```
- stdout → `.freebuff/preview-<id>.log`
- stderr → `.freebuff/preview-<id>.log.err`
