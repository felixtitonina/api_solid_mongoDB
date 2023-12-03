import { HttpResponse, IController } from '../protocols';
import { IGetUsersRepository } from './protocols';
import { ok, serverError } from '../helpers';
import { User } from 'models/user';

export class GetUsersController implements IController {
  // injeção de dependência
  // getUsersRepository: IGetUsersRepository;
  // constructor(getUsersRepository: IGetUsersRepository) {
  //   this.getUsersRepository = getUsersRepository;
  // }

  //  --- ou ---
  //  constructor(private readonly getUsersRepository: IGetUsersRepository) {}
  // recebera o constructor e asinalara o getUsersRepository no this da classe

  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      // validar req
      const users = await this.getUsersRepository.getUsers();
      // redirecionr para o prepository
      return ok<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
