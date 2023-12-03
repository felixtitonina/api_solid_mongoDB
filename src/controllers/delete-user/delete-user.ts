import { HttpRequest, HttpResponse } from '../../controllers/protocols';
import { User } from '../../models/user';
import { IDeleteUserController, IDeleteUserRepository } from './protocols';

export class DeleteUserController implements IDeleteUserController {
  constructor(private readonly deleteUserRepositiry: IDeleteUserRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: 'id não encontrado.',
        };
      }
      const user = await this.deleteUserRepositiry.deleteUser(id);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Erro interno do servidor.',
      };
    }
  }
}
