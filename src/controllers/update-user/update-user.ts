import { HttpRequest, HttpResponse, IController } from '../../controllers/protocols';
import { User } from '../../models/user';
import { UpdateUserParams, IUpdateUserRepository } from './protocols';

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: 'Body invalido.',
        };
      }

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
