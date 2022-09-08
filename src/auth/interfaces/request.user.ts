// External modules
import { Request } from 'express';

// Internal modules
import { IUser } from '../../user/interfaces/user.interface';

interface RequestWithUser extends Request {
  user: IUser;
}

export default RequestWithUser;