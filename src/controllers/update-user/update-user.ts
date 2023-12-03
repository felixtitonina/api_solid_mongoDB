import { badRequest, ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../../controllers/protocols';
import { User } from '../../models/user';
import { UpdateUserParams, IUpdateUserRepository } from './protocols';

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest('Body invalido.');
      }

      if (!id) {
        return badRequest('id obrigatóro.');
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
        return badRequest('Body invalido.');
      }
      const user = await this.updateUserRepository.updateUser(id, body);
      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
