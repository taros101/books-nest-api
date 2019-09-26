
import { users } from '../users/users.entity';

export const authProviders = [
  {
    provide: 'authRepository',
    useValue: users,
  },
];