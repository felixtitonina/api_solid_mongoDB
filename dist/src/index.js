"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_update_user_1 = require("./repositories/update-user/mongo-update-user");
const create_user_1 = require("./controllers/create-user/create-user");
const get_users_1 = require("./controllers/get-users/get-users");
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongo_get_users_1 = require("./repositories/get-user/mongo-get-users");
const mongo_1 = require("./database/mongo");
const mongo_create_user_1 = require("./repositories/create-user/mongo-create-user");
const update_user_1 = require("./controllers/update-user/update-user");
const mongo_delete_user_1 = require("./repositories/delete-user/mongo-delete-user");
const delete_user_1 = require("./controllers/delete-user/delete-user");
const main = async () => {
    (0, dotenv_1.config)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    await mongo_1.MongoClient.connect();
    app.get('/users', async (req, res) => {
        const mongoGetUsersRepository = new mongo_get_users_1.MongoGetUsersRepository();
        const getUsersController = new get_users_1.GetUsersController(mongoGetUsersRepository);
        const { body, statusCode } = await getUsersController.handle();
        res.status(statusCode).send(body);
    });
    app.post('/users', async (req, res) => {
        const mongoCreateUserRepository = new mongo_create_user_1.MongoCreateUserRepository();
        const createUsersController = new create_user_1.CreateUserController(mongoCreateUserRepository);
        const { body, statusCode } = await createUsersController.handle({ body: req.body });
        res.status(statusCode).send(body);
    });
    app.patch('/users/:id', async (req, res) => {
        const mongoUpdateUserRepository = new mongo_update_user_1.MongoUpdateUserRepository();
        const updateUsersController = new update_user_1.UpdateUserController(mongoUpdateUserRepository);
        const { body, statusCode } = await updateUsersController.handle({
            body: req.body,
            params: req.params,
        });
        res.status(statusCode).send(body);
    });
    app.delete('/users/:id', async (req, res) => {
        const mongoDeleteUserRepository = new mongo_delete_user_1.MongoDeleteUserRepository();
        const deleteUsersController = new delete_user_1.DeleteUserController(mongoDeleteUserRepository);
        const { body, statusCode } = await deleteUsersController.handle({
            body: req.body,
            params: req.params,
        });
        res.status(statusCode).send(body);
    });
    const port = process.env.PORT;
    app.listen(port, () => console.log(`Conectado na porta ${port}`));
};
main();
