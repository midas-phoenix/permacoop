import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {IUserRepository} from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import {User, UserRole} from 'src/Domain/HumanResource/User/User.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  public findOneByApiToken(apiToken: string): Promise<User | undefined> {
    return this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.role'
      ])
      .where('user.apiToken = :apiToken', {apiToken})
      .getOne();
  }

  public findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.apiToken',
        'user.password',
        'user.role'
      ])
      .where('user.email = :email', {email})
      .getOne();
  }

  public findOneById(id: string): Promise<User | undefined> {
    return this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.role'
      ])
      .where('user.id = :id', {id})
      .getOne();
  }

  public findUsers(withAccountant: boolean): Promise<User[]> {
    const query = this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.role'
      ])
      .orderBy('user.lastName', 'ASC')
      .addOrderBy('user.firstName', 'ASC');

    if (false === withAccountant) {
      query.where('user.role <> :role', {role: UserRole.ACCOUNTANT});
    }

    return query.getMany();
  }

  public save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
