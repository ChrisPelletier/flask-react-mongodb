import bcrypt

def encrypt_password(password):
    return bcrypt.hashpw(password.encode('ascii'), bcrypt.gensalt(14))

def verify_password(password_hash, password):
    return bcrypt.checkpw(password.encode('ascii'), password_hash)
