import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // CREATE USER (with password hashing)
  async create(data: Partial<User>) {
    const hashedPassword = await bcrypt.hash(data.password as string, 10);

    const user = this.userRepository.create({
      email: data.email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  // FIND USER BY EMAIL (used in AuthService)
  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  // GET ALL USERS
  findAll() {
    return this.userRepository.find();
  }

  // GET USER BY ID
  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // UPDATE USER
  async update(id: number, data: Partial<User>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.userRepository.update(id, data);
    return this.findOne(id);
  }

  // DELETE USER
  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
