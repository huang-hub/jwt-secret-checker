import jwt from "jsonwebtoken";

export interface JWTInfo {
    header: any;
    payload: any;
    algorithm: string;
}

export function parseJWT(token: string): JWTInfo | null {
    try {
        const decoded = jwt.decode(token, { complete: true });
        if (!decoded || typeof decoded === "string") return null;

        return {
            header: decoded.header,
            payload: decoded.payload,
            algorithm: decoded.header.alg || "unknown",
        };
    } catch (error) {
        return null;
    }
}

export function verifyWithSecret(token: string, secret: string): boolean {
    try {
        jwt.verify(token, secret);
        return true;
    } catch (error) {
        return false;
    }
}
