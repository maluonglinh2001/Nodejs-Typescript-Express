import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { getRepository } from 'typeorm';
@Service()
export class UserService {
  private userRepository = getRepository(UserModel);

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await this.userRepository.findOne(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    const user = await this.userRepository.findOne({ email: userData.email });
    if (user) {
      throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    const hashedPassword = await hash(userData.password, 10);
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    return newUser;
  }

  public async updateUser(userId: number, userData: User): Promise<User[]> {
    const findUser: User = await this.userRepository.findOne({ id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);

    findUser.email = userData.email;
    findUser.password = hashedPassword;

    await this.userRepository.save(findUser);

    const updatedUserData: User[] = await this.userRepository.find();
    return updatedUserData;
  }

  public async deleteUser(userId: number): Promise<User[]> {
    const findUser: User = await this.userRepository.findOne({ id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await this.userRepository.delete({ id: userId });

    const users: User[] = await this.userRepository.find();
    return users;
  }
}
