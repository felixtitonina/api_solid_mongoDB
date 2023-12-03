"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoGetUsersRepository = void 0;
const mongo_1 = require("../../database/mongo");
class MongoGetUsersRepository {
    async getUsers() {
        /**
         * @Obs
         * Usando o "Omit" informamos que o valor id não existe no documento
         * <Omit<User, 'id'>>
         */
        const users = await mongo_1.MongoClient.db.collection('users').find({}).toArray();
        return users.map(({ _id, ...rest }) => ({ ...rest, id: _id.toHexString() }));
    }
}
exports.MongoGetUsersRepository = MongoGetUsersRepository;
