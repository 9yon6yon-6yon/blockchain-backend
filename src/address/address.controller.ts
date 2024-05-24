import { Body, Controller, Post,Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateUserAddressDTO } from './dto/address.dto';
import { Address } from 'src/models/address.model';
@ApiTags('User API')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @ApiOperation({ summary: 'Create a new user address and saves to databasetable' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created', type: Address })
    @Post()
    createUserAddress(@Body() createUserAddressDTO: CreateUserAddressDTO): Promise<Address> {
        return this.addressService.createUserAddress(createUserAddressDTO);
    }


}
