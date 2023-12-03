import { HttpRequest, HttpResponse } from '../../controllers/protocols';
import { User } from '../../models/user';

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
