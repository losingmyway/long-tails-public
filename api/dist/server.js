"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const jsonData_1 = require("./handlers/jsonData");
const PORT = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.PORT) || 3333;
app_1.default.post("/json-data", (req, res) => {
    try {
        return res.json((0, jsonData_1.getJsonItems)());
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
});
app_1.default.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});
//# sourceMappingURL=server.js.map