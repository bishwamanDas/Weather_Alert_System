"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const p = new client_1.PrismaClient();
p.user.deleteMany({ where: { role: 'USER' } })
    .then((res) => console.log('Cleaned up users for recording:', res.count))
    .finally(() => p.$disconnect());
//# sourceMappingURL=wipe.js.map