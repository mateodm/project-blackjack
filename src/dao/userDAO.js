import Users from "../models/users.model.js";

export default class UserManager {
    constructor() {
        this.users = Users
    }
    async getUsers() {
        try {
            return await this.users.find().select('-password -age -email').lean()
        }
        catch (e) {
            console.log(e)
        }
    }
    async getByEmailSafe(email) {
        try {
            return await this.users.findOne({ email: email }).select('-password -age -email').lean()
        }
        catch (e) {
            console.log(e)
        }
    }
    async getByEmail(email) {
        try {
            return await this.users.findOne({ email: email })
        }
        catch (e) {
            console.log(e)
        }
    }
    async findOne(param) {
        try {
            return await this.users.findOne(param)
        }
        catch (e) {
            console.log(e)
        }
    }
    async create(user) {
        try {
            return await this.users.create(user)
        }
        catch (e) {
            console.log(e)
        }
    }
    async delete(email) {
        try {
            return await this.users.findOneAndDelete({ email: email })
        }
        catch (e) {
            console.log(e)
        }
    }
    async update(email, toUpdate) {
        try {
            return await this.users.findOneAndUpdate({ email: email, toUpdate })
        }
        catch (e) {
            console.log(e)
        }
    }
    async betResult(user, bet, status) {
        try {
            let userFind = await this.users.findOne({ username: user }).select('-password -age -email')
            if (status === "dealer") {
                let newBalance = Number(userFind.chips) + Number(bet)
                return await this.users.findOneAndUpdate({ username: user }, { chips: newBalance })
            }
            else if (status === "player") {
                let newBalance = Number(userFind.chips) - Number(bet)
                return await this.users.findOneAndUpdate({ username: user }, { chips: newBalance })
            }
            else if (status === "draw") {
                return
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async getFreeCoins(id) {
        try {
            let user = await this.users.findById(id).select('-password -age')
            if (user.chips <= 100) {
                let coins = await this.users.findByIdAndUpdate(id, { chips: 100})
                return 
            }
            else {
                return
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}