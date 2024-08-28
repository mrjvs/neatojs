# ⚡@neato/auth

Simple authentication, without being locked in.


## 🔥Features
- Makes authentication simple.
- Secure and transparent - it does what you expect.
- Versatile - You aren't locked into a data structure.


## 🍄Installation / usage

> **Visit the [documentation](https://neatojs.com/docs/auth) on how to install.**


## 📖Documentation

**Visit the [website](https://neatojs.com/docs/auth) for documentation.**


## 🧬 Running locally for development

```sh
npm i -g pnpm # install PNPM if you don't have it already
pnpm i # install dependencies of the entire repo

pnpm -C packages/auth run test # run tests
```

## Todo list

The todo list for this library/libraries

### Version 1.0:
- [ ] Make driver types work
- [ ] Make sqlite driver
- [ ] Make prisma driver
- [ ] finish feature: totp
- [ ] finish feature: session feature
- [ ] finish feature: password feature (including password reset + email verification)
- [ ] implement security stamp
- [ ] Basic documentation:
   - How to use the library
   - Page dedicated to every driver
   - Page dedicated to every feature
   - How to make your own feature
   - How to make your own driver

### Improvements:
- [ ] Docs: guidelines on implementing your own auth
- [ ] Docs: deep dive on how web auth works
- [ ] Docs: tutorials for frameworks
- [ ] Separate drivers and features into their own packages

### New features for future versions:
- [ ] feature: login/passkey
- [ ] feature: mfa/securitykey
- [ ] feature: login/oauth2
- [ ] feature: sso/oauth2
- [ ] feature: login/saml
- [ ] feature: sso/saml
- [ ] feature: login/magic
- [ ] implement sudo mode
- [ ] driver: drizzle
- [ ] driver: mongoose
- [ ] driver: redis
