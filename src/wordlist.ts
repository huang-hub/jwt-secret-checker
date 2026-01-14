import fs from "fs";
import path from "path";

export function loadWordlist(customPath?: string): string[] {
    const defaultPaths = [
        path.join(__dirname, "../wordlists/common.txt"),
        path.join(__dirname, "../wordlists/jwt-weak.txt")
    ];

    const pathsToLoad = customPath ? [customPath] : defaultPaths;
    const secrets = new Set<string>();

    for (const filePath of pathsToLoad) {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, "utf-8");
            content.split(/\r?\n/).forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith("#")) {
                    secrets.add(trimmed);
                }
            });
        }
    }

    return Array.from(secrets);
}
