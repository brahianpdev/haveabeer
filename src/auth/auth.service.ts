// Internal modules
import { IToken } from './interfaces/token.interface';
import { LogInDto } from './dtos/login.dto';
import userService from '../user/user.service';
import jwtService from './jwt.service';

class AuthService {
    constructor() { }

    async login(loginDto: LogInDto) {
        const user = await userService.findByEmail(loginDto.email);

        if (!user) throw new Error('User not found');

        const isPasswordValid = await userService.isPasswordValid(loginDto.password, user.password);
        const token: any = await jwtService.generateToken(user);

        if (!isPasswordValid) throw new Error('Password is invalid');

        const cookie = await this.createCookie(token);
        return { user, cookie };
    }

    async createCookie(token: IToken) {
        const cookie = `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`;
        return cookie;
    }
}

export default new AuthService();