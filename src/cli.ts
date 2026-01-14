#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import { checkWeakSecret } from "./checker";
import { parseJWT } from "./jwt";

program
    .name("jwt-secret-checker")
    .description("🔐 Detect weak JWT secrets for security testing and education")
    .version("1.0.0")
    .argument("<jwt>", "JWT token to verify")
    .option("-w, --wordlist <path>", "Path to a custom wordlist file")
    .action(async (token, options) => {
        console.log(chalk.cyan("\n🔍 Analyzing JWT..."));

        const info = parseJWT(token);
        if (info) {
            console.log(`${chalk.bold("Algorithm:")} ${info.algorithm}`);
            console.log(`${chalk.bold("Payload:")} ${JSON.stringify(info.payload, null, 2)}`);
        }

        const result = await checkWeakSecret(token, options.wordlist);

        if (result.vulnerable) {
            console.log("\n" + chalk.red.bold("❌ Weak JWT secret detected!"));
            console.log(`${chalk.yellow("Secret Found:")} ${chalk.green(result.secret)}`);
            console.log(`${chalk.yellow("Algorithm:")} ${result.algorithm}`);
            console.log(`\n${chalk.bgRed(" WARNING ")} Using weak secrets can lead to token forgery and account takeover.`);
            console.log(chalk.gray("\nLooking for a secure way to generate strong JWT secrets?"));
            console.log(chalk.blue.underline("👉 https://jwtsecrets.com"));
        } else {
            if (result.reason) {
                console.log("\n" + chalk.yellow(`⚠️  Note: ${result.reason}`));
            } else {
                console.log("\n" + chalk.green("✅ No weak secret found in the current wordlist."));
            }
        }
        console.log("");
    });

program.parse();
