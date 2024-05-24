import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO, UserCredDTO } from './dto/user.dto';
import { Users } from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import Web3 from 'web3';

import { CreateUserAddressDTO } from 'src/address/dto/address.dto';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/models/address.model';
@Injectable()
export class UserService {
    private readonly email: string;
    private readonly password: string;
    private readonly userAddress: string;
    private readonly userprivateKey: string;

    constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>, private readonly addressService: AddressService,
    ) { }
    userAuth(userCredential: UserCredDTO): boolean {
        if (userCredential.email === this.email && userCredential.password === this.password) {
            return true;
        }
        return false;
    }


    async createUser(createUserDTO: CreateUserDTO): Promise<Users> {
        const { email, password } = createUserDTO;

        const newUser = new Users(email, password);
        await newUser.hashPassword();


        const webSocketPath = 'ws://127.0.0.1:8551'; // Replace with  actual websocket path geth
        const wsProvider = new Web3.providers.WebsocketProvider(webSocketPath);
        const web3 = new Web3(wsProvider);



        console.log('+++++++++++++++++++++++++++++++++');
        const accountaddress = web3.eth.accounts.create();
        console.log('Created account address:', accountaddress);
        console.log('+++++++++++++++++++++++++++++++++');


        const encryptedPrivateKeyPromise = await web3.eth.accounts.encrypt(accountaddress.privateKey, password);
        console.log('+++++++++++++++++++++++++++++++++');
        console.log('Encrypted private key:', encryptedPrivateKeyPromise);
        console.log('+++++++++++++++++++++++++++++++++');


        try {

            const result = await this.userRepository.insert(newUser);
            console.log('+++++++++++++++++++++++++++++++++');
            console.log('USER saved:', result);
            console.log('+++++++++++++++++++++++++++++++++');
            const createAddressDTO: CreateUserAddressDTO = {
                user_id: newUser,
                blockchainAddress: accountaddress.address,
                encryptedPrivateKey: {
                    version: encryptedPrivateKeyPromise.version,
                    uuid: encryptedPrivateKeyPromise.id,
                    ciphertext: encryptedPrivateKeyPromise.crypto.ciphertext,
                    cipherparams: {
                        iv: encryptedPrivateKeyPromise.crypto.cipherparams.iv
                    },
                    cipher: encryptedPrivateKeyPromise.crypto.cipher,
                    kdf: encryptedPrivateKeyPromise.crypto.kdf,
                    kdfparams: {
                        dklen: encryptedPrivateKeyPromise.crypto.kdfparams.dklen,
                        salt: encryptedPrivateKeyPromise.crypto.kdfparams.salt.toString(),
                    },
                    mac: encryptedPrivateKeyPromise.crypto.mac,
                }
            };


            const createdAddress = await this.addressService.createUserAddress(createAddressDTO);
            console.log('+++++++++++++++++++++++++++++++++');
            console.log('Address saved:', createdAddress);
            console.log('+++++++++++++++++++++++++++++++++');
            return newUser;

        } catch (error) {
            throw new BadRequestException('User with this email already exists.');
        }
    }
    async getUserByEmail(email: string): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException(`User with email : ${email} was not found`);
        }
        return user;
    }
    async getUserByID(id: number): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { id: id } });

        if (!user) {
            throw new NotFoundException(`User with id : ${id} was not found`);
        }

        return user;
    }

    async userLogin(userCredDTO: UserCredDTO): Promise<{ user: Users, address: Address }> {
        const { email, password } = userCredDTO;
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const address = await this.addressService.loginDecryption(user.id);
        const webSocketPath = 'ws://127.0.0.1:8551'; // Replace with  actual websocket path geth
        const wsProvider = new Web3.providers.WebsocketProvider(webSocketPath);
        const web3 = new Web3(wsProvider);

        let addressData = {
            version: address.version,
            id: address.uuid,
            address: address.blockchainAddress,
            crypto: {
                ciphertext: address.crypto_ciphertext,
                cipherparams: { iv: address.crypto_cipherparams_iv },
                cipher: address.crypto_cipher,
                kdf: address.crypto_kdf,
                kdfparams: {
                    n: 8192,
                    r: 8,
                    p: 1,
                    dklen: address.crypto_kdfparams_dklen,
                    salt: address.crypto_kdfparams_salt,
                },
                mac: address.crypto_mac
            }
        };

        // const addressDataString = JSON.stringify(addressData);
        // console.log('+++++++++++++++++++++++++++++++++');
        // console.log(addressDataString);
        // console.log('+++++++++++++++++++++++++++++++++');
        // const user_addr = await web3.eth.accounts.decrypt(addressDataString, password);
        // console.log('+++++++++++++++++++++++++++++++++');
        // console.log(user_addr);
        // console.log('+++++++++++++++++++++++++++++++++');
        return { user, address };
    }
}
