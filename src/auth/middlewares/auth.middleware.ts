// External modules
import { Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

// Internal modules
import userService from "../../user/user.service";
import { DataStoredInToken } from '../interfaces/stored.token.interface';
import RequestWithUser from "../interfaces/request.user";
import { WrongAuthenticationTokenException } from "../exceptions/wrong.auth.token.missing.exception";
import { AuthenticationTokenMissingException } from "../exceptions/auth.token.missing.exception";
import enviromentConfig from "../../config/enviroment.config";


async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {

    const cookies = req.cookies;

    if (cookies && cookies.Authorization) {
        const secret = enviromentConfig.jwt.secret;

        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await userService.findById(id);

            if (user) {
                req.user = user; next();
            } else { next(new WrongAuthenticationTokenException()); }

        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}

export default authMiddleware;