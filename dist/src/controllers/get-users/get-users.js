"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersController = void 0;
const helpers_1 = require("../helpers");
class GetUsersController {
    // injeção de dependência
    // getUsersRepository: IGetUsersRepository;
    // constructor(getUsersRepository: IGetUsersRepository) {
    //   this.getUsersRepository = getUsersRepository;
    // }
    //  --- ou ---
    //  constructor(private readonly getUsersRepository: IGetUsersRepository) {}
    // recebera o constructor e asinalara o getUsersRepository no this da classe
    constructor(getUsersRepository) {
        this.getUsersRepository = getUsersRepository;
    }
    async handle() {
        try {
            // validar req
            const users = await this.getUsersRepository.getUsers();
            // redirecionr para o prepository
            return (0, helpers_1.ok)(users);
        }
        catch (error) {
            return (0, helpers_1.serverError)();
        }
    }
}
exports.GetUsersController = GetUsersController;
