import { User } from '../../models/user';

export interface CreateUSerParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface ICreateUserRepository {
  createUser(params: CreateUSerParams): Promise<User>;
}
