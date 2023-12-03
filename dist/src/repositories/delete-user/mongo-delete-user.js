"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDeleteUserRepository = void 0;
const mongo_1 = require("../../database/mongo");
const mongodb_1 = require("mongodb");
class MongoDeleteUserRepository {
    async deleteUser(id) {
        const user = await mongo_1.MongoClient.db
            .collection('users')
            .findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!user) {
            throw new Error('usuario não encontrado.');
        }
        const { deletedCount } = await mongo_1.MongoClient.db
            .collection('users')
            .deleteOne({ _id: new mongodb_1.ObjectId(id) });
        if (!deletedCount) {
            throw new Error('usuario não foi deletetado.');
        }
        const { _id, ...rest } = user;
        return { id: _id.toHexString(), ...rest };
    }
}
exports.MongoDeleteUserRepository = MongoDeleteUserRepository;
