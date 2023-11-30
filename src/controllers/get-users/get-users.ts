import { IGetUsersController, IGetUsersRepository } from './protocols';

export class GetUsersController implements IGetUsersController {
  // injeção de dependência
  // getUsersRepository: IGetUsersRepository;
  // constructor(getUsersRepository: IGetUsersRepository) {
  //   this.getUsersRepository = getUsersRepository;
  // }

  //  --- ou ---
  //  constructor(private readonly getUsersRepository: IGetUsersRepository) {}
  // recebera o constructor e asinalara o getUsersRepository no this da classe

  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {
    try {
      // validar req
      const users = await this.getUsersRepository.getUsers();
      // redirecionr para o prepository
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'falha na requisição.',
      };
    }
  }
}
