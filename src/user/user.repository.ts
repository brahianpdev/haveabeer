// Internal modules
import { IUser } from "./interfaces/user.interface";
import { CreateUserDto } from "./dtos/create.user.dto";
import { UpdateUserDto } from "./dtos/update.user.dto";
import User from "./schemas/user.schema";

class UserRepository {
    constructor() { }

    async findAll(): Promise<IUser[]> {
        return User.find();
    }

    async findById(id: string): Promise<IUser> {
        return User.findById(id);
    }

    async findByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }

    async findByUsername(username: string) {
        return User.findOne({ username });
    }

    async create(user: CreateUserDto): Promise<IUser> {
        const createdUser = await User.create(user);

        return createdUser.save();
    }

    async update(id: string, user: UpdateUserDto): Promise<IUser> {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

        return updatedUser.save();
    }

    async updateLogin(id: string): Promise<IUser> {
        const updatedUser = await User.findByIdAndUpdate(id, { lastLogin: new Date() }, { new: true });

        return updatedUser.save();
    }

    async delete(id: string) {
        return User.findByIdAndDelete(id);
    }
}

export default new UserRepository();
