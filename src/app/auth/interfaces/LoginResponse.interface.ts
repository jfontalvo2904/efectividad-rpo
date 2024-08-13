import User from "./User.interface";

export default interface LoginResponse {
    token: string;
    user:  User;
}