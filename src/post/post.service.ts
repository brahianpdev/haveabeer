/* eslint-disable @typescript-eslint/no-empty-function */
// External modules
// Internal modules
import { IPost } from './interfaces/post.interface';
import { CreatePostDto } from './dtos/create.post.dto';
import postRepository from './post.respository';

// Utils
import { toUpperCase } from '../utils/uppercase';
import { toTrimCase } from '../utils/trim';
import { UpdatePostDto } from './dtos/update.post.dto';

class PostService {
    constructor() { }

    async findAll(): Promise<IPost[]> {
        try {
            const posts = await postRepository.findAll();
            return posts;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {string} id Post ID
     * @return {Promise} 
     */

    async findById(id: string): Promise<IPost> {
        try {
            return await postRepository.findById(id);
        } catch (error) {
            throw new error
        }
    }

    async findByUser(user: any): Promise<IPost[]> {
        try {
            return postRepository.findByUser(user)
        } catch (error) {
            throw new error
        }
    }


    async create(createPostDto: CreatePostDto): Promise<IPost> {
        try {
            const postFound = await postRepository.findByTitle(createPostDto.title);

            if (postFound) throw new Error("Post already exist");

            const postTrim: CreatePostDto = toTrimCase(createPostDto);
            const post = await postRepository.create(postTrim)

            return toUpperCase(post)

        } catch (error) {
            throw error
        }

    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<IPost> {
        try {
            const post = await postRepository.update(id, updatePostDto);

            return toUpperCase(post);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Async delete(id: string): Promise IPost  {
     * @param {string} id - string - The id of the post to delete
     * @returns The deleted post.
     */
    async delete(id: string): Promise<IPost> {
        try {
            return postRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

}

export default new PostService();

