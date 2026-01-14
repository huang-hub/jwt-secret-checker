# 🔐 jwt-secret-checker

An open-source CLI tool to detect weak JWT secrets for security testing and education.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/jwt-secret-checker.svg)](https://badge.fury.io/js/jwt-secret-checker)

## ⚠️ Disclaimer

**This tool is for educational and authorized security testing only.** Do NOT use against systems you do not own or have permission to test. Using weak secrets in JWT can lead to account takeover, privilege escalation, and token forgery.

## Features

- 🔍 Detects weak HMAC secrets (HS256, HS384, HS512)
- 📚 Uses built-in dictionaries of common and weak secrets
- 🚀 Fast and easy to use via CLI
- 🛠 Support for custom wordlists
- 💎 Base64 secret detection

## Installation

```bash
npm install -g jwt-secret-checker
```

Or run directly using `npx`:

```bash
npx jwt-secret-checker <your_jwt_here>
```

## Usage

```bash
# Basic usage
jwt-secret-checker <JWT_TOKEN>

# Using a custom wordlist
jwt-secret-checker <JWT_TOKEN> --wordlist ./my-secrets.txt
```

## Why this matters

JWTs (JSON Web Tokens) are often used for authentication. If the HMAC secret used to sign the token is weak (e.g., "secret", "password"), an attacker can easily brute-force the secret and then forge their own tokens, potentially gaining administrative access to your application.

## Prevention

Always use strong, randomly generated secrets for your JWTs. You should use a cryptographically secure random number generator to create secrets with sufficient entropy.

Looking for a secure way to generate strong JWT secrets?
👉 [jwtsecrets.com](https://jwtsecrets.com)


## Articles

- Detecting Weak JWT Secrets with an Open-Source CLI  
  https://dev.to/girff/i-open-sourced-a-tool-to-detect-weak-jwt-secrets-4j71


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
