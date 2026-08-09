import crypto from "crypto"
import bcrypt from "bcryptjs"

export class otpService {
    generatedCode(): string {
        return crypto.randomInt(100000, 1000000).toString();
    }

    async hashCode(code: string): Promise<string> {
        return bcrypt.hash(code, 10);
    }

    async compareCode(code: string, hash: string): Promise<boolean>{
        return bcrypt.compare(code, hash)
    }
}