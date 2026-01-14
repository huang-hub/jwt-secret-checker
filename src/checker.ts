import { parseJWT, verifyWithSecret } from "./jwt";
import { loadWordlist } from "./wordlist";

export interface CheckResult {
    vulnerable: boolean;
    secret?: string;
    algorithm?: string;
    reason?: string;
}

export async function checkWeakSecret(token: string, customWordlist?: string): Promise<CheckResult> {
    const jwtInfo = parseJWT(token);

    if (!jwtInfo) {
        return { vulnerable: false, reason: "Invalid JWT format" };
    }

    const { algorithm } = jwtInfo;

    if (!algorithm || !algorithm.startsWith("HS")) {
        return {
            vulnerable: false,
            algorithm,
            reason: `Algorithm ${algorithm} is not HMAC-based (HS256, HS384, HS512)`
        };
    }

    const secrets = loadWordlist(customWordlist);

    for (const secret of secrets) {
        if (verifyWithSecret(token, secret)) {
            return {
                vulnerable: true,
                secret,
                algorithm,
            };
        }
    }

    // Also check if secret is base64 encoded
    for (const secret of secrets) {
        try {
            const base64Secret = Buffer.from(secret, 'base64');
            if (verifyWithSecret(token, base64Secret.toString())) {
                return {
                    vulnerable: true,
                    secret: `${secret} (as base64)`,
                    algorithm,
                };
            }
        } catch (e) {
            // Not a valid base64 or other issue
        }
    }

    return { vulnerable: false, algorithm };
}
