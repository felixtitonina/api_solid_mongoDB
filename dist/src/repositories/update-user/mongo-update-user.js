"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUpdateUserRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../database/mongo");
class MongoUpdateUserRepository {
    async updateUser(id, params) {
        await mongo_1.MongoClient.db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: {
                ...params,
            },
        });
        const user = await mongo_1.MongoClient.db
            .collection('users')
            .findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!user) {
            throw new Error('Não foi possivel atualizar usuario.');
        }
        const { _id, ...rest } = user;
        return { id: _id.toHexString(), ...rest };
    }
}
exports.MongoUpdateUserRepository = MongoUpdateUserRepository;
