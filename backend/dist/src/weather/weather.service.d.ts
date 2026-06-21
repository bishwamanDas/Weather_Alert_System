import { PrismaService } from '../prisma/prisma.service';
export declare class WeatherService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleCron(): Promise<void>;
}
