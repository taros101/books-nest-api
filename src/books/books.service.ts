import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Books } from './books.entity';
import { Response } from 'express';


@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY') private readonly BOOKS_REPOSITORY: typeof Books) { }

  async findAll(): Promise<Books[]> {
    console.log('done');

    return await this.BOOKS_REPOSITORY.findAll<Books>();
  }
  async findOne(req): Promise<Books> {
    const id = req.params.id
    return await this.BOOKS_REPOSITORY.findOne<Books>(id);

  }

  async findBooksByTitle(req): Promise<Books[]> {
    const Sequelize = require('sequelize');
    const title = req.params.title
    console.log(title);
    const Op = Sequelize.Op;
    const books = await this.BOOKS_REPOSITORY.findAll<Books>({ where:
       { title: {
        [Op.substring]: `${title}` 
    } } });

    return books
  }


  async postBook(req): Promise<any> {
    console.log(req.body.title);
    const newBook: any = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      cover: req.body.cover,
      price: req.body.price,
    };

    if (req.body.title) {
      await this.BOOKS_REPOSITORY.create<Books>(newBook)

      return new HttpException('Add is done', 201);

    } else return "Requset body  is incorrect!"

  }

}