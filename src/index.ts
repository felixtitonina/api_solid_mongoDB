import { GetUsersController } from './controllers/get-users/get-users';
import express from 'express';
import { config } from 'dotenv';
import { MongoGetUsersRepository } from './repositories/get-user/mongo-get-users';
import { MongoClient } from './database/mongo';

const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  app.get('/users', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();
    res.send(body).status(statusCode);
  });

  const port = process.env.PORT;

  app.listen(port, () => console.log(`Conectado na porta ${port}`));
};
main();
