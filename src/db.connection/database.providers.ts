import { Sequelize } from 'sequelize-typescript';
import { Books } from '../books/books.entity';
import { users, users_roles, roles } from '../users/users.entity';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'roma123456789',
        database: 'MyBase',
        define: {
          timestamps: false
      }
      });
      sequelize.addModels([users, users_roles, roles, Books]);
      await sequelize.sync();
      return sequelize;
    },
  }
];

