"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// External modules
const bcrypt = __importStar(require("bcrypt"));
const user_repository_1 = __importDefault(require("./user.repository"));
// Utils
const uppercase_1 = require("../utils/uppercase");
const trim_1 = require("../utils/trim");
class UserService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_repository_1.default.findAll();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_repository_1.default.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_repository_1.default.findByEmail(email);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findTopDrunks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.findAll();
                const topDrunks = users.sort((a, b) => b.donations - a.donations).slice(0, 3);
                return topDrunks;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield user_repository_1.default.findByEmail(createUserDto.email.trim());
                //email validated 
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(userFound))
                    throw new Error('invalid email');
                if (userFound)
                    throw new Error('user already exists');
                const userTrim = (0, trim_1.toTrimCase)(createUserDto);
                const hashedPassword = yield this.hashedPassword(userTrim.password);
                const user = yield user_repository_1.default.create(Object.assign(Object.assign({}, userTrim), { password: hashedPassword }));
                user.password = undefined;
                return (0, uppercase_1.toUpperCase)(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.hashedPassword(updateUserDto.password);
                const user = yield user_repository_1.default.update(id, Object.assign(Object.assign({}, updateUserDto), { password: hashedPassword }));
                user.password = undefined;
                return (0, uppercase_1.toUpperCase)(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateLogin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_repository_1.default.updateLogin(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_repository_1.default.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Utils
    validateCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.findByEmail(email);
                const isValid = yield bcrypt.compare(password, user.password);
                if (!isValid)
                    throw new Error('Invalid credentials');
                user.password = undefined;
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    isPasswordValid(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return bcrypt.compare(password, hashedPassword);
            }
            catch (error) {
                throw error;
            }
        });
    }
    hashedPassword(password, saltRounds = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return bcrypt.hash(password, saltRounds);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map