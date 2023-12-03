import { badRequest, ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../../controllers/protocols';
import { User } from '../../models/user';
import { IDeleteUserRepository } from './protocols';

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepositiry: IDeleteUserRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest('id não encontrado.');
      }
      const user = await this.deleteUserRepositiry.deleteUser(id);
      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
