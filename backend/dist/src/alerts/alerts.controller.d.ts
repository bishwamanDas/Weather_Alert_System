import { AlertsService } from './alerts.service';
export declare class AlertsController {
    private readonly alertsService;
    constructor(alertsService: AlertsService);
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
