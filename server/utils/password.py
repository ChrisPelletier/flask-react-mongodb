import bcrypt

def encrypt_password(password):
    return bcrypt.hashpwd(password, bcrypt.gensalt(14))

def verify_password(password_hash, password):
    return bcrypt.checkpw(password, password_hash)
