import { Books } from './books.entity';

export const booksProviders = [
  {
    provide: 'booksRepository',
    useValue: Books,
  },
];