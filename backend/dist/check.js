"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const p = new client_1.PrismaClient();
p.user.findMany().then(console.log).finally(() => p.$disconnect());
//# sourceMappingURL=check.js.map