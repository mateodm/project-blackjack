import userService from "../service/index.service.js"

export default async function checkRegister(req, res, next) {
    let { email, username, password, age} = req.body
    if (!email && !username && !password && !age ) {
        return res.json({ success: false, message: "missing camps"})
    }
    else {
        let user = await userService.getByEmail(email)
        let usernameCheck = await userService.findOne({ username: username })
        if(user) {
            return res.json({ success: false, message: "El correo electronico está en uso"})
        }
        else if(username.length > 18) {
            return res.json({success: false, message: "Tu nombre no puede tener más de 18 caracteres"})
        }
        else if(usernameCheck) {
            return res.json({success: false, message: "El nombre de usuario no está disponible"})
        }
        else {
            next()
        }
    }
}