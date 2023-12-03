import validator from 'validator';

import { HttpRequest, HttpResponse, IController } from '../../controllers/protocols';
import { User } from '../../models/user';
import { CreateUserParams, ICreateUserRepository } from './protocols';
import { badRequest, created, serverError } from '../helpers';

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>> {
    try {
      // validar se body existe
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest('Body invalido');
        }
      }
      // verificar se o email  é valido
      const emailValidator = validator.isEmail(httpRequest.body!.email);
      if (!emailValidator) {
        return badRequest('E-mail invalido.');
      }
      const user = await this.createUserRepository.createUser(httpRequest.body!);
      return created<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
