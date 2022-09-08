import { Request, Response } from 'express';
// Internal modules
import { CreatePostDto } from './dtos/create.post.dto';
import HttpStatus from '../config/http.status';
import postService from './post.service';
import { UpdatePostDto } from './dtos/update.post.dto';
import { IGetUserAuthInfoRequest } from "../auth/interfaces/auth.interface"


class PostController {
    constructor() { }

    async findAll(req: Request, res: Response) {
        try {
            const posts = await postService.findAll();
            return res.status(HttpStatus.OK).send(posts);
        } catch (error) {
            res.status(HttpStatus.NOT_FOUND)
                .send('Posts not found')
        }
    }

    async findByUser(req: Request, res: Response) {
        try {
            const { user } = req.query
            const posts = await postService.findByUser(user)
            res.send(posts)
        } catch (error) {

        }
    }



    async findById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const post = await postService.findById(id);
            return res.status(HttpStatus.OK).send(post);
        } catch (error) {
            res.status(HttpStatus.NOT_FOUND)
                .send(`post by id ${id} not found`)
        }
    }



    async create(req: IGetUserAuthInfoRequest, res: Response) {

        try {

            const createPostDto: CreatePostDto = { ...req.body, image: req.file.filename, _user: req.user._id }
            const post = await postService.create(createPostDto);

            res.status(HttpStatus.OK).send(post);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }


    async update(req: Request, res: Response) {
        try {
            const updateUserDto: UpdatePostDto = req.body;

            const post = await postService.update(req.params.id, updateUserDto);

            return res.status(HttpStatus.OK).send(post);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            postService.delete(id);
            return res.status(HttpStatus.OK).send(`Post deleted by ID-${id} successfully`);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(`Post by ID ${id} not deleted`);
        }
    }
}

export default new PostController();