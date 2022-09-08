// External modules
import { Request, Response } from 'express';

// Internal modules
import authService from "./auth.service";
import { LogInDto } from "./dtos/login.dto";

class authController {
    constructor() { }

    async login(req: Request, res: Response) {
        const loginDto: LogInDto = req.body;

        const { cookie } = await authService.login({ ...loginDto });
        res.setHeader("Set-Cookie", [cookie]);

        return res.status(200).send('Login successful');
    }

    async logout(req: Request, res: Response) {
        res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);

        return res.status(200).send('Logout successful');
    }
}

export default new authController();