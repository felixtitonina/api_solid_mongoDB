import { IGetUsersRepository } from '../../controllers/get-users/protocols';
import { MongoClient } from '../../database/mongo';
import { User } from '../../models/user';

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    /**
     * @Obs
     * Usando o "Omit" informamos que o valor id não existe no documento
     * <Omit<User, 'id'>>
     */
    const users = await MongoClient.db.collection<Omit<User, 'id'>>('users').find({}).toArray();
    return users.map(({ _id, ...rest }) => ({ ...rest, id: _id.toHexString() }));
  }
}
