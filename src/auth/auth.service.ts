import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoggedInDto } from './dto/logged-in.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService) {}



  async validateUser(username: string, password: string): Promise<LoggedInDto> {

    // find user by username
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      console.log(`user not found: username=${username}`)
      return null
    }

    // found & compare
    if (await bcrypt.compare(password, user.password)) {
      const { password, ...userWithoutPassword} = user;
      return userWithoutPassword;
    } else {
      console.log(`wrong password: username=${username}`)
      return null
    }
  }
  
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
