import { CreatePostDto } from "./dtos/create.post.dto";
import { UpdatePostDto } from "./dtos/update.post.dto";
import { IPost } from "./interfaces/post.interface";
import Post from "./schemas/post.schema"

class PostRepository {
    constructor() { }

    async findAll(): Promise<IPost[]> {
        return Post.find();
    }

    async findById(id: string): Promise<IPost> {
        return Post.findById(id);
    }

    /**
     * Find all posts and populate the user field with the user's username, but only if the username
     * matches the username passed in as a parameter.
     * @param {string} username - any -&gt; the user that is logged in
     * @returns An array of posts that have a user that matches the username passed in.
     */
    async findByUser(username: any): Promise<IPost[]> {
        const postByUser = await Post.find().populate({ path: "_user", match: { username: username }, select: "username" }).exec()
        const postFilter = postByUser.filter((user: IPost) => user._user !== null)
        return postFilter
    }

    async findByTitle(title: string): Promise<IPost> {
        return Post.findOne({ title })
    }

    async create(post: CreatePostDto): Promise<IPost> {
        const createdPost = await Post.create(post);

        return createdPost.save();
    }


    async update(id: string, post: UpdatePostDto): Promise<IPost> {
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

        return updatedPost.save();
    }

    async delete(id: string) {
        return Post.findByIdAndDelete(id);
    }
}

export default new PostRepository();

