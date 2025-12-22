import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE USER (public)
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  // GET ALL USERS (protected)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // GET USER BY ID (public)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  // UPDATE USER (public for now)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<CreateUserDto>) {
    return this.usersService.update(Number(id), body);
  }

  // DELETE USER (public for now)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}

