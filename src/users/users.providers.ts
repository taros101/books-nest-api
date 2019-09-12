import { users, roles, users_roles } from './users.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: users,
  },
];

export const rolesProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useValue: roles,
  },
];

export const rolesUsersProviders = [
  {
    provide: 'ROLES_USERS_REPOSITORY',
    useValue: users_roles,
  },
];