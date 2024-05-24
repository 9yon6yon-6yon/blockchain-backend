import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO, UserCredDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/models/user.model';
import { Address } from 'src/models/address.model';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created', type: Users })
  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO, ): Promise<Users> {
    return this.userService.createUser(createUserDTO);
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Return the user with the specified ID', type: Users })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  getUserByID(@Param('id') id: number): Promise<Users> {
    return this.userService.getUserByID(id);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful.', type: String })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  userLogin(@Body() userCredDTO: UserCredDTO): Promise<{ user: Users; address: Address; }> {
    return this.userService.userLogin(userCredDTO);
  }
}
