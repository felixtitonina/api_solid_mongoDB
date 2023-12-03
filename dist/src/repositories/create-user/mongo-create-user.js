"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCreateUserRepository = void 0;
const mongo_1 = require("../../database/mongo");
class MongoCreateUserRepository {
    async createUser(params) {
        const { insertedId } = await mongo_1.MongoClient.db.collection('users').insertOne(params);
        const user = await mongo_1.MongoClient.db.collection('users').findOne({ _id: insertedId });
        if (!user) {
            throw new Error('Usuario não criado');
        }
        const { _id, ...rest } = user;
        return { id: _id.toHexString(), ...rest };
    }
}
exports.MongoCreateUserRepository = MongoCreateUserRepository;
