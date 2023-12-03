"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const helpers_1 = require("../helpers");
class DeleteUserController {
    constructor(deleteUserRepositiry) {
        this.deleteUserRepositiry = deleteUserRepositiry;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async handle(httpRequest) {
        var _a;
        try {
            const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.id;
            if (!id) {
                return (0, helpers_1.badRequest)('id não encontrado.');
            }
            const user = await this.deleteUserRepositiry.deleteUser(id);
            return (0, helpers_1.ok)(user);
        }
        catch (error) {
            return (0, helpers_1.serverError)();
        }
    }
}
exports.DeleteUserController = DeleteUserController;
