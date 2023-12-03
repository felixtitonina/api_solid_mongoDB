import { HttpRequest, HttpResponse } from '../../controllers/protocols';
import { User } from '../../models/user';
import { IUpdateUserController, UpdateUserParams, IUpdateUserRepository } from './protocols';

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: 'id obrigatóro',
        };
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        'firstName',
        'lastName',
        'password',
      ];
      const someFieldIsNotAllowedToUodate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams),
      );
      if (someFieldIsNotAllowedToUodate) {
        return {
          statusCode: 400,
          body: 'Body invalido',
        };
      }
      const user = await this.updateUserRepository.updateUser(id, body);
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
