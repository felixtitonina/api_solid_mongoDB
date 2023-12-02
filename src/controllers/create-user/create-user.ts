import validator from 'validator';

import { HttRequest, HttpResponse } from '../../controllers/protocols';
import { User } from '../../models/user';
import { CreateUSerParams, ICreateUserController, ICreateUserRepository } from './protocols';

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(httpRequest: HttRequest<CreateUSerParams>): Promise<HttpResponse<User>> {
    try {
      // validar se body existe
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUSerParams]?.length) {
          return {
            statusCode: 400,
            body: 'Body invalido',
          };
        }
      }
      // verificar se o email  é valido
      const emailValidator = validator.isEmail(httpRequest.body!.email);
      if (!emailValidator) {
        return {
          statusCode: 403,
          body: 'E-mail invalido.',
        };
      }
      const user = await this.createUserRepository.createUser(httpRequest.body!);
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: 'Erro do servidor',
      };
    }
  }
}
