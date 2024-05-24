import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/models/user.model";



export class CreateUserAddressDTO {
    @ApiProperty({
        name: 'user_id',
        description: "ID of the user associated with the listing mendatory",
        type: Users,
        example: 1,
    })
    readonly user_id: Users;

    @ApiProperty({
        name: 'blockchainAddress',
        description: "saves the blockchain address on create",
        type: String,
        example: '0x6f159b3a0d056381b978467aadf6xxxxxxxxxx',
    })
    readonly blockchainAddress: string;

    @ApiProperty({
        name: 'encryptedPrivateKey',
        description: "Encrypt the private key with password",
        type: Object,

        example: {
            version: 1,
            ciphertext: 'cb3e13e3281ff3861a3f0257fad4c9a51b0eb046f9c7821825c46b210f040b8f',
            cipherparams: { iv: 'bfb43120ae00e9de110f8325143a2709' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '210d0ec956787d865358ac45716e6dd42e68d48e346d795746509523aeb477dd'
            },
            mac: 'efbf6d3409f37c0084a79d5fdf9a6f5d97d11447517ef1ea8374f51e581b7efd'

        },
    })
    encryptedPrivateKey: {
        version: number;
        uuid: string;
        ciphertext: string;
        cipherparams: { iv: string };
        cipher: string;
        kdf: string;
        kdfparams: {
            dklen: number;
            salt: string;
        };
        mac: string;
    };
}
