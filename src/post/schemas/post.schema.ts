import mongoose from 'mongoose';
// Internal modules
import { IPost } from '../interfaces/post.interface';

const PostSchema = new mongoose.Schema({
    // Post
    title: { type: String, require: true },
    image: {type: String, require: true}, 
    description: { type: String, required: false },
    _user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
});

export default mongoose.model<IPost>('Post', PostSchema);