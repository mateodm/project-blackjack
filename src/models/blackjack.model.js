import {model, Schema} from "mongoose"

let collection = "blackjackCards"

let schema = new Schema({
    value: {type: Number, required: true, index: true},
    img: {type:String, required: true, index: true},
    suit: {type: String, required: true, index: true}
})

let bCards = model(collection, schema)

export default bCards