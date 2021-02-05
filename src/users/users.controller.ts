import { Get, Controller, Res, HttpStatus, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';


    @Controller('users')
    export class UsersController {
        constructor( private userService: UsersService) {}

    } 