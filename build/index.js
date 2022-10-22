"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = require("colors/safe");
const routes_1 = require("./server/routes");
const server_1 = require("./server/server");
const port = process.env.PORT || 3333;
server_1.express_app.use(routes_1.routes);
server_1.express_app.listen(port, () => {
    console.log((0, safe_1.cyan)(`Server initialized in port ${port}`));
});
