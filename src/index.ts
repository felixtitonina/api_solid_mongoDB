import { CreateUserController } from './controllers/create-user/create-user';
import { GetUsersController } from './controllers/get-users/get-users';
import express from 'express';
import { config } from 'dotenv';
import { MongoGetUsersRepository } from './repositories/get-user/mongo-get-users';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';

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

  const port = process.env.PORT;

  app.listen(port, () => console.log(`Conectado na porta ${port}`));
};
main();
