CREATE TABLE useraddress(
    addressid SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    blockchain_address VARCHAR(255) NOT NULL,
    version INT NOT NULL,
    uuid VARCHAR(255) NOT NULL,
    crypto_ciphertext TEXT NOT NULL,
    crypto_cipherparams_iv VARCHAR(255) NOT NULL,
    crypto_cipher VARCHAR(255) NOT NULL,
    crypto_kdf VARCHAR(255) NOT NULL,
    crypto_kdfparams_dklen INT NOT NULL,
    crypto_kdfparams_salt TEXT NOT NULL,
    crypto_mac TEXT NOT NULL
)