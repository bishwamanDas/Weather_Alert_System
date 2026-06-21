import { PrismaService } from '../prisma/prisma.service';
export declare class AlertsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        user: {
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
    })[]>;
    deleteAll(): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
