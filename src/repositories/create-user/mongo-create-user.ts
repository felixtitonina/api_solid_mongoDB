import { User } from '../../models/user';
import { CreateUserParams, ICreateUserRepository } from '../../controllers/create-user/protocols';
import { MongoClient } from '../../database/mongo';
import { MongoUser } from 'repositories/mongo-protocols';

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db.collection('users').insertOne(params);

    const user = await MongoClient.db.collection<MongoUser>('users').findOne({ _id: insertedId });
    if (!user) {
      throw new Error('Usuario não criado');
    }
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
