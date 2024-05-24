import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IsEmail } from "class-validator";
import { Address } from "./address.model";

@Entity('users')
@Unique(['email'])
export class Users {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    readonly id?: number;
    @IsEmail()
    @Column('varchar', { length: 50, name: 'email', nullable: false, unique: true })
    email: string;
    @Column('varchar', { length: 255, name: 'password', nullable: false })
    password: string;
    @OneToOne(() =>  Address, address => address.user, { nullable: true, cascade: true }) // One-to-One relation with UserAddress
    userAddress?: Address;

    constructor( email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}