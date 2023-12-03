"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const validator_1 = __importDefault(require("validator"));
const helpers_1 = require("../helpers");
class CreateUserController {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository;
    }
    async handle(httpRequest) {
        var _a, _b;
        try {
            // validar se body existe
            const requiredFields = ['firstName', 'lastName', 'email', 'password'];
            for (const field of requiredFields) {
                if (!((_b = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _a === void 0 ? void 0 : _a[field]) === null || _b === void 0 ? void 0 : _b.length)) {
                    return (0, helpers_1.badRequest)('Body invalido');
                }
            }
            // verificar se o email  é valido
            const emailValidator = validator_1.default.isEmail(httpRequest.body.email);
            if (!emailValidator) {
                return (0, helpers_1.badRequest)('E-mail invalido.');
            }
            const user = await this.createUserRepository.createUser(httpRequest.body);
            return (0, helpers_1.created)(user);
        }
        catch (error) {
            return (0, helpers_1.serverError)();
        }
    }
}
exports.CreateUserController = CreateUserController;
