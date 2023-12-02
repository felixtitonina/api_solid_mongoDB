import { User } from './../../models/user';
import { HttpResponse, HttRequest } from './../protocols';

export interface ICreateUserController {
  handle(httpRequest: HttRequest<CreateUSerParams>): Promise<HttpResponse<User>>;
}

export interface CreateUSerParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUSerParams): Promise<User>;
}
