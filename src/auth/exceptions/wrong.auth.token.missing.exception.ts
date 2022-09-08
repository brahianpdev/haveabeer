// Internal modules
import { HttpException } from "./http.exception";

export class WrongAuthenticationTokenException extends HttpException {
    constructor() {
        super(401, "Wrong authentication token");
    }
}
