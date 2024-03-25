import jwt from "jsonwebtoken"
export default async (req, res, next) => {
    if (req) {
        const token = jwt.sign({ email: req }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24});
        return token
    }   
    else {
        return 
    }
}