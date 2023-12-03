"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const helpers_1 = require("../helpers");
class UpdateUserController {
    constructor(updateUserRepository) {
        this.updateUserRepository = updateUserRepository;
    }
    async handle(httpRequest) {
        var _a;
        try {
            const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.id;
            const body = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
            if (!body) {
                return (0, helpers_1.badRequest)('Body invalido.');
            }
            if (!id) {
                return (0, helpers_1.badRequest)('id obrigatóro.');
            }
            const allowedFieldsToUpdate = [
                'firstName',
                'lastName',
                'password',
            ];
            const someFieldIsNotAllowedToUodate = Object.keys(body).some((key) => !allowedFieldsToUpdate.includes(key));
            if (someFieldIsNotAllowedToUodate) {
                return (0, helpers_1.badRequest)('Body invalido.');
            }
            const user = await this.updateUserRepository.updateUser(id, body);
            return (0, helpers_1.ok)(user);
        }
        catch (error) {
            return (0, helpers_1.serverError)();
        }
    }
}
exports.UpdateUserController = UpdateUserController;
