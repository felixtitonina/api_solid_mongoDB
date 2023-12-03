"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoClient = void 0;
const mongodb_1 = require("mongodb");
exports.MongoClient = {
    // singleton instance, qualquer camada do projeto pode chamar mas a instancia sera a mesmoa para todos
    client: undefined,
    db: undefined,
    async connect() {
        var _a, _b, _c;
        const url = (_a = process.env.MONGODB_URL) !== null && _a !== void 0 ? _a : 'localhost:27017';
        const username = (_b = process.env.MONGODB_USERNAME) !== null && _b !== void 0 ? _b : '';
        const password = (_c = process.env.MONGODB_PASSWORD) !== null && _c !== void 0 ? _c : '';
        const client = new mongodb_1.MongoClient(url, { auth: { username, password } });
        const db = client.db('users-db');
        this.client = client;
        this.db = db;
        console.log('Conectado ao mongoDB');
    },
};
