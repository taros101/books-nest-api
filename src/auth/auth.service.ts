import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { users, roles } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from "@nestjs/common"
import { ConfigService } from '../config/config.service';
import * as jwtr from "jwt-then"

@Injectable()
export class AuthService {

  private test: any;

  public jwtService: JwtService;

  @Inject('authRepository') private readonly authRepository: typeof users
  
  constructor(config: ConfigService) {
    this.test = config.get('APP');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user: any = await this.authRepository.findOne<users>({ where: { email: email } })
    if (!user) {
      console.log(user)
      throw new HttpException('User not found', 404);
    }

    const matchPasswords = await bcrypt.compare(password, user.dataValues.password);
    if (user && matchPasswords) {
      return user.dataValues;
    } else throw new UnauthorizedException;
  }

  async login(user: any) {
    let permissions: any[] = [];

    await this.authRepository.findAll<users>({
      where: { id: user.id },
      include: [{
        model: roles
      }]
    }).then((rolen: any) => rolen.forEach(el => {
      el.roleId.forEach(element => {
        permissions.push(element.dataValues.roleName);
      });
    }))

    const payload = {
      id: user.id,
      roles: permissions[0]
    };

    const token = await jwtr.sign(payload, "secret")

    return {
      data: token
    };
  }
}