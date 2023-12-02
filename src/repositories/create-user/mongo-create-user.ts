import { User } from '../../models/user';
import { CreateUSerParams, ICreateUserRepository } from '../../controllers/create-user/protocols';
import { MongoClient } from '../../database/mongo';

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUSerParams): Promise<User> {
    const { insertedId } = await MongoClient.db.collection('users').insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('users')
      .findOne({ _id: insertedId });
    if (!user) {
      throw new Error('Usuario não criado');
    }
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
