import { User } from '../../models/user';
import { IDeleteUserRepository } from '../../controllers/delete-user/protocols';
import { MongoClient } from '../../database/mongo';
import { ObjectId } from 'mongodb';

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('users')
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error('usuario não encontrado.');
    }
    const { deletedCount } = await MongoClient.db
      .collection('users')
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error('usuario não foi deletetado.');
    }
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
