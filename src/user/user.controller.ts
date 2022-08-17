// External modules
import { Request, Response } from 'express';

// Internal modules
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';
import HttpStatus from '../config/http.status';
import userService from './user.service';

class UserController {
    constructor() { }

    async findAll(req: Request, res: Response) {
        try {
            const users = await userService.findAll();
            return res.status(HttpStatus.OK).send(users);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const user = await userService.findById(req.params.id);

            return res.status(HttpStatus.OK).send(user);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }

    async findByEmail(req: Request, res: Response) {
        try {
            const user = userService.findByEmail(req.params.email);

            return res.status(HttpStatus.OK).send(user);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findTopDrunks(req: Request, res: Response) {
        try {
            const drunks = userService.findTopDrunks();

            return res.status(HttpStatus.OK).send(drunks);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const createUserDto: CreateUserDto = req.body;
            const user = userService.create(createUserDto);
            return res.status(HttpStatus.OK).send(user);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updateUserDto: UpdateUserDto = req.body;

            const user = userService.update(req.params.id, updateUserDto);

            return res.status(HttpStatus.OK).send(user);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            userService.delete(req.params.id);

            return res.status(HttpStatus.OK).send('User deleted');
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default new UserController();