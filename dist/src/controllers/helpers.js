"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.badRequest = exports.created = exports.ok = void 0;
const protocols_1 = require("./protocols");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ok = (body) => ({
    statusCode: protocols_1.HttpStatusCode.OK,
    body,
});
exports.ok = ok;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const created = (body) => ({
    statusCode: protocols_1.HttpStatusCode.CREATED,
    body,
});
exports.created = created;
const badRequest = (messsage) => {
    return {
        statusCode: protocols_1.HttpStatusCode.BAD_REQUEST,
        body: messsage,
    };
};
exports.badRequest = badRequest;
const serverError = () => {
    return {
        statusCode: protocols_1.HttpStatusCode.SERVER_ERROR,
        body: 'Error interno.',
    };
};
exports.serverError = serverError;
