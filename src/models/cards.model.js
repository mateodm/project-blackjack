import { model, Schema} from "mongoose"

let collection = "cards"

let schema = new Schema({
    id: {type: Number, index: true},
    numero: {type: Number, index: true},
    palo: {type: String, index: true},
    jerarquia: { type: Number, index: true},
    img: {type: String, index: true},
})

let Cards = model(collection, schema)

export default Cards