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
    {
        userId: 6,
        username: 'andy',
        password: 'overthrow',
        },
    {
      userId: 7,
      username: 'don',
      password: 'overthrow',
      },
  {
      userId: 8,
      username: 'amanda',
      password: 'overthrow',
      },
  {
      userId: 9,
      username: 'ashley',
      password: 'overthrow', 
  },
  {
    userId: 10,
    username: 'ward1',
    password: 'overthrow', 
    },
  {
      userId: 11,
      username: 'ward2',
      password: 'overthrow', 
   },
  {
    userId: 12,
    username: 'ward5',
    password: 'overthrow', 
  },
  ];

  async findOne(username: string): Promise<User | undefined> {
      console.log('async findOne(username: string): Promise<User | undefined> {' + username);
    return this.users.find(user => user.username === username);
  }

  async profile(username: string): Promise<User | undefined> {
    console.log('async profile(username: string): Promise<User | undefined> {' + username);
  return this.users.find(user => user.username === username);
  }

  async save(user: User): Promise<User | undefined> {
    console.log('save profile(username: string): Promise<User | undefined> {' + user);
  return this.users.push(user);
  }
}