import { MongoUpdateUserRepository } from './repositories/update-user/mongo-update-user';
import { CreateUserController } from './controllers/create-user/create-user';
import { GetUsersController } from './controllers/get-users/get-users';
import express from 'express';
import { config } from 'dotenv';
import { MongoGetUsersRepository } from './repositories/get-user/mongo-get-users';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';
import { UpdateUserController } from './controllers/update-user/update-user';
import { MongoDeleteUserRepository } from './repositories/delete-user/mongo-delete-user';
import { DeleteUserController } from './controllers/delete-user/delete-user';

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get('/users', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();
    res.status(statusCode).send(body);
  });

  app.post('/users', async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUsersController = new CreateUserController(mongoCreateUserRepository);
    const { body, statusCode } = await createUsersController.handle({ body: req.body });
    res.status(statusCode).send(body);
  });

  app.patch('/users/:id', async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUsersController = new UpdateUserController(mongoUpdateUserRepository);

    const { body, statusCode } = await updateUsersController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.delete('/users/:id', async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUsersController = new DeleteUserController(mongoDeleteUserRepository);

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
