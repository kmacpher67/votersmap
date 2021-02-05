import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'milner',
      password: 'guess',
    },
    {
        userId: 3,
        username: 'james',
        password: 'overthrow',
    },
    {
        userId: 4,
        username: 'ken',
        password: 'overthrow',
    },
    {
        userId: 5,
        username: 'jason',
        password: 'overthrow',
        },
  ];

  async findOne(username: string): Promise<User | undefined> {
      console.log('async findOne(username: string): Promise<User | undefined> {' + username);
    return this.users.find(user => user.username === username);
  }
}