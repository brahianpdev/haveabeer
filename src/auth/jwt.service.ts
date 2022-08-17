// External modules
import jwt from 'jsonwebtoken';

// Internal modules
import { DataStoredInToken } from './interfaces/stored.token.interface';
import enviromentConfig from '../config/enviroment.config'

class JwtService {
    constructor() {}

    async generateToken(user: any) {
        const storedToken: DataStoredInToken = { _id: user._id };

        return {
            token: jwt.sign(storedToken, enviromentConfig.jwt.secret, { expiresIn: enviromentConfig.jwt.expireTime }),
            expiresIn: enviromentConfig.jwt.expireTime
        }
    }
}

export default new JwtService();