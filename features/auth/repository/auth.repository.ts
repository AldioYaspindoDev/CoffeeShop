import { prisma } from "@/lib/db/index"
import { RequestOtpDto } from "../validators/auth.validator";

export class UserRepository {
    async findUserByPhone(phone: string){
        return prisma.user.findUnique({
            where: {
                phone
            }
        });
    }

    async createdUser(data: RequestOtpDto){
        return prisma.user.create({ data });
    }

    async createOtp(data: {
        userId: string;
        code: string;
        expiredAt: Date;
    }){
        return prisma.otp.create({ data });
    }

    async invalidatePreviousOtp(userId: string){
        return prisma.otp.updateMany({
            where: {
                userId,
                isUsed: false
            },

            data: {
                isUsed: true
            }
        });
    }

    async findLatestOtp(userId: string){
        return prisma.otp.findFirst({
            where: {
                userId,
                isUsed: false
            },

            orderBy: {
                createdAt: "desc"
            }
        });
    }

    async markOtpIsUsed(id: string){
        return prisma.otp.updateMany({
            where: {
                id,
                isUsed: false
            },

            data: {
                isUsed: true
            }
        });
    }

    async verifyUser(userId: string){
        return prisma.user.update({
            where: {
                id: userId
            },

            data: {
                isVerified: true
            }
        })
    }
}