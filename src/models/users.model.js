import { model, Schema} from "mongoose"

let collection = "users"

let schema = new Schema({
    email: {type: String, required: true, index: true},
    username: {type: String, required: true, index: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    avatar: { type: String, default: "../imagenes/default-avatar.png"},
    role: {type: String, default: "user"},
    chips: {type: Number, default: 100},
    created_in: {type: Date, default: Date.now}
})

let Users = model(collection, schema)

export default Users