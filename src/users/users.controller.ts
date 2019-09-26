import { Controller, Get, Post, Req, Res, Put, Delete ,UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express'
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService,private readonly authService: AuthService) { }

    @Get()
    findAll(@Res() res: Response): any {
        return this.usersService.findAll(res);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    findOne(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.findOne(req, res);
    }

    @Put('/:id')
    addBook(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.addBook(req, res);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/editUser/:id')
    editUser(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.editUser(req, res);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/deleteUser/:id')
    deleteUser(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.deleteUser(req, res);
    }

    @Put('/changeProfile/:id')
    changeProfile(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.changeProfile(req, res);
    }

    @Post("/register")
    registerNewUser(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.registerNewUser(req, res);
    }

}
