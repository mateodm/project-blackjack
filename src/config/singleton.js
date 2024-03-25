import mongoose from "mongoose";
import config from "./config.js";

class MongoSingleton {
  static #instance;

  constructor() {
    mongoose.connect(config.mongoUrl);
    this.connection = mongoose.connection;

    this.connection.on('connected', () => {
      console.log('MongoDB connected!');
    });

    this.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
  }

  static getInstance() {
    if (this.#instance) {
      console.log('You already connected');
      return this.#instance;
    }

    this.#instance = new MongoSingleton();
    console.log('Connected!');
    return this.#instance;
  }

  getConnection() {
    return this.connection;
  }
}

export default MongoSingleton;
