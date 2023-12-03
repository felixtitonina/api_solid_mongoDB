import { HttpRequest, HttpResponse } from '../../controllers/protocols';
import { User } from '../../models/user';

export interface IDeleteUserController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}
export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
