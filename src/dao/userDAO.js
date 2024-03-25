import Users from "../models/users.model.js";

export default class UserManager {
    constructor() {
        this.users = Users
    }
    async getUsers() {
        try {
            return await this.users.find().select('-password -age -email').lean()
        }
        catch(e) {
            console.log(e)
        }
    }
    async getByEmail(email) {
        try {
            return await this.users.findOne({email: email})
        }
        catch(e) {
            console.log(e)
        }
    }
    async findOne(param) {
        try {
            return await this.users.findOne(param)
        }
        catch(e) {
            console.log(e)
        }
    }
    async create(user) {
        try {
            return await this.users.create(user)
        }
        catch(e) {
            console.log(e)
        }
    }
    async delete(email) {
        try {
            return await this.users.findOneAndDelete({email: email})
        }
        catch (e) {
            console.log(e)
        }
    }
    async update(email, toUpdate) {
        try {
            return await this.users.findOneAndUpdate({email: email, toUpdate})
        }
        catch(e) {
            console.log(e)
        }
    }
}