import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.model";

@Entity('useraddress')
export class Address {
    @PrimaryGeneratedColumn('increment', { name: 'addressid' })
    readonly id?: number;

    @Column('varchar', { length: 255, name: 'blockchain_address', nullable: false })
    blockchainAddress: string;
    
    @Column('int', { name: 'version', nullable: false })
    version: number;

    @Column('varchar', { length: 36, name: 'uuid', nullable: false })
    uuid: string;

    @Column('text', { name: 'crypto_ciphertext', nullable: false })
    crypto_ciphertext: string;

    @Column('varchar', { length: 32, name: 'crypto_cipherparams_iv', nullable: false })
    crypto_cipherparams_iv: string;

    @Column('varchar', { length: 20, name: 'crypto_cipher', nullable: false })
    crypto_cipher: string;

    @Column('varchar', { length: 20, name: 'crypto_kdf', nullable: false })
    crypto_kdf: string;


    @Column('int', { name: 'crypto_kdfparams_dklen', nullable: false })
    crypto_kdfparams_dklen: number;

    @Column('text', { name: 'crypto_kdfparams_salt', nullable: false })
    crypto_kdfparams_salt: string;

    @Column('text', { name: 'crypto_mac', nullable: false })
    crypto_mac: string;

    @ManyToOne(() => Users, user => user.userAddress, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: Users;

    constructor(
        version: number,
        uuid: string,
        blockchainAddress: string,
        crypto_ciphertext: string,
        crypto_cipherparams_iv: string,
        crypto_cipher: string,
        crypto_kdf: string,
        crypto_kdfparams_dklen: number,
        crypto_kdfparams_salt: string,
        crypto_mac: string,
        user: Users
    ) {
        this.version = version;
        this.uuid = uuid;
        this.blockchainAddress = blockchainAddress;
        this.crypto_ciphertext = crypto_ciphertext;
        this.crypto_cipherparams_iv = crypto_cipherparams_iv;
        this.crypto_cipher = crypto_cipher;
        this.crypto_kdf = crypto_kdf;
        this.crypto_kdfparams_dklen = crypto_kdfparams_dklen;
        this.crypto_kdfparams_salt = crypto_kdfparams_salt;
        this.crypto_mac = crypto_mac;
        this.user = user;
    }

}