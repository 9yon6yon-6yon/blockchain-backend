import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/models/address.model';
import { Repository } from 'typeorm';
import { CreateUserAddressDTO } from './dto/address.dto';
import Web3 from 'web3';



@Injectable()
export class AddressService {

    constructor(@InjectRepository(Address) private readonly useraddressRepository: Repository<Address>,
    ) { }
    async createUserAddress(createAddressDTO: CreateUserAddressDTO): Promise<Address> {

        const {
            user_id,
            blockchainAddress,
            encryptedPrivateKey: {
                version,
                uuid,
                ciphertext,
                cipherparams: { iv },
                cipher,
                kdf,
                kdfparams: { dklen, salt },
                mac,
            },
        } = createAddressDTO;

        const newAddress = new Address(
            version, uuid, blockchainAddress, ciphertext, iv, cipher, kdf, dklen, salt, mac, user_id

        );
        console.log('##################################');
        console.log(newAddress);
        console.log('##################################');
        const result = await this.useraddressRepository.insert(newAddress);
        return newAddress;


    }


    async loginDecryption(user_id: number): Promise<Address> {
        const userAddress = await this.useraddressRepository.findOne({ where: { user: { id: user_id } } });

        if (!userAddress) {
            throw new Error('No addresses found for this user.');
        }
    
        return userAddress;
    }
}
