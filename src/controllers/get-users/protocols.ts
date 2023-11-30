import { HttpResponse } from 'controllers/protocols';
import { User } from 'models/user';

export interface IGetUsersController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle(): Promise<HttpResponse<User[]>>;
}

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
