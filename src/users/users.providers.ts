import { users, roles, users_roles } from './users.entity';

export const usersProviders = [
  {
    provide: 'userRepository',
    useValue: users,
  },
];

export const rolesProviders = [
  {
    provide: 'rolesRepository',
    useValue: roles,
  },
];

export const rolesUsersProviders = [
  {
    provide: 'rolesUsersRepository',
    useValue: users_roles,
  },
];