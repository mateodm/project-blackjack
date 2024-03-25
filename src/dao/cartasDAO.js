import { createTestAccount } from "nodemailer";
import bCards from "../models/blackjack.model.js";

export default class BlackjackCards {
    constructor() {
        this.cards = bCards
    }
    async getAll() {
        return await this.cards.find().lean()
    }
    async getOne(id) {
        return await this.cards.findById(id).lean()
    }
}

