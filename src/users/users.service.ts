import { Injectable, Inject } from '@nestjs/common';
import { users, users_roles } from './users.entity';
import { HttpException } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import * as jwt from "jwt-then";

interface User {
  email: string,
  password: string,
  img: string,
  age: number
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('userRepository') private readonly userRepository: typeof users,
    @Inject('rolesUsersRepository') private readonly rolesUsersRepository: typeof users_roles,
  ) { }

  async findAll(res): Promise<users[]> {
      const users = await this.userRepository.findAll<users>({ attributes: ['id', 'email', 'img', 'userBooks'] });
      if (users != []) {
        return res.status(200).send({
          success: true,
          data: users
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'Users not found',
          data: null
        });

      }
  }

  async findOne(req, res): Promise<users[]> {
      const user = await this.userRepository.findOne<users>({ attributes: ['id', 'email', 'img', 'userBooks'], where: { id: req.params.id } });
      if (user) {
        return res.status(200).send({
          success: true,
          data: user
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });

      }
  }

  async addBook(req, res): Promise<users[]> {
      const user = await this.userRepository.findOne<users>({ attributes: ['id', 'email', 'img', 'userBooks'], where: { id: req.params.id } });

      const check = await this.userRepository.findOne<users>({ where: { id: req.params.id } });
      if (check) {
        await this.userRepository.update<users>(req.body, { where: { id: req.params.id } });
        return res.status(200).send({
          success: true,
          message: 'Update is done'
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
  }

  async deleteUser(req, res): Promise<any> {
      const token: string = req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(token, 'secret');
      if ((<any>decoded).roles !== 'admin') {
        return res.status(401).send({ auth: false, message: "You are not admin" });
      }

      const check = await this.userRepository.findOne<users>({ where: { id: req.params.id } });

      if (check) {
        await this.userRepository.destroy({ where: { id: req.params.id } });
        return res.status(200).send({
          success: true,
          message: 'Delete is done'
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });

      }
  }

  async editUser(req, res): Promise<any> {
      const token: string = req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(token, 'secret');
      if ((<any>decoded).roles !== 'admin') {
        return res.status(401).send({ auth: false, message: "You are not admin" });
      }

      const check = await this.userRepository.findOne<users>({ where: { id: req.params.id } });

      if (check) {
        await this.userRepository.update<users>(req.body, { where: { id: req.params.id } });
        return res.status(200).send({
          success: true,
          message: 'Update is done'
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
  }

  async changeProfile(req, res): Promise<any> {
      const check = await this.userRepository.findOne<users>({ where: { id: req.params.id } });

      if (check) {
        const user = await this.userRepository.update<users>(req.body, { where: { id: req.params.id } });
        return res.status(200).send({
          success: true,
          message: 'Update is done'
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });

      }
  }

  async registerNewUser(req, res): Promise<any> {
    const newUser: any = {
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      img: req.body.img,
      userBooks: req.body.userBooks
    };

      const matchUser: any = await this.userRepository.findOne({ where: { email: newUser.email } })

      if (!matchUser) {
        await this.userRepository.create<users>(newUser);
        const userCurrent = await this.userRepository.findOne({ where: { email: newUser.email } })
        const newUserRoles: any = {
          users_id: userCurrent.id,
          roles_id: 222
        }
        await this.rolesUsersRepository.create<users_roles>(newUserRoles);
        res.status(200).send({
          success: true,
          message: "User Successfully created"
        });
      } else return res.status(401).send({
        success: false,
        message: `User with E-mail:${matchUser.email} alredy exist!`
      });
  }
}