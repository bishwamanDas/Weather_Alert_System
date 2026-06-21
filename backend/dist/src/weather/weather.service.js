"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WeatherService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
let WeatherService = WeatherService_1 = class WeatherService {
    prisma;
    logger = new common_1.Logger(WeatherService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleCron() {
        this.logger.debug('Running weather generation job for approved users');
        const approvedUsers = await this.prisma.user.findMany({
            where: { status: 'APPROVED', role: 'USER' }
        });
        if (approvedUsers.length === 0) {
            this.logger.debug('No approved users to generate weather alerts for.');
            return;
        }
        const weatherConditions = ['Thunderstorm Warning', 'Heavy Rain Expected', 'Clear Skies', 'High Winds Alert'];
        for (const user of approvedUsers) {
            const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            await this.prisma.alert.create({
                data: {
                    userId: user.id,
                    message: condition,
                }
            });
            this.logger.debug(`Generated alert for user ${user.email}: ${condition}`);
        }
    }
};
exports.WeatherService = WeatherService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WeatherService.prototype, "handleCron", null);
exports.WeatherService = WeatherService = WeatherService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map