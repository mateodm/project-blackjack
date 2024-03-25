import userService from "../service/index.service.js"
import jwt from "jsonwebtoken"
import passport from "passport";
import { Strategy } from "passport-local";
import pjwt from "passport-jwt"
import GoogleStrategy from 'passport-google-oauth20';
import config from "./config.js";
import cookieParser from "cookie-parser";

const generateRandomPassword = () => {
    const length = 40; 
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#$%&$&%';
    let password = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
  
    return password;
  };

  const randomPassword = generateRandomPassword();

export default function () {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use("register", new Strategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
        try {
            let user = await userService.getByEmail({ email: email })
            if (!user) {
                let create = await userService.create(req.body)
                return done(null, create)
            }
            return done(null, false)
        }
        catch (error) {
            return done(null, false)
        }
    }))
    passport.use("signin", new Strategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            let user = await userService.getByEmail(email)
            if (user) {
                return done(null, user)
            }
            else {
                return done(null, false, { message: 'Correo electrónico o contraseña incorrectos' });

            }
        }
        catch (error) {
            return done(error)
        }
    }))


    passport.use('jwt', new pjwt.Strategy({
        jwtFromRequest: pjwt.ExtractJwt.fromExtractors([(req) => req?.cookies['token']]),
        secretOrKey: process.env.JWT_SECRET
    },
        async (jwt_payload, done) => {
            try {
                let user = await userService.getByEmail(jwt_payload.email)
                if (user) {
                    delete user.password
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error, false)
            }
        })
    )

    passport.use(new GoogleStrategy({
        clientID: config.googleID,
        clientSecret: config.googleSecret,
        callbackURL: "http://localhost:8080/api/auth/google/callback",
        session: false,
        scope: ['profile', 'email']
    }, async  (accessToken, refreshToken, user, done) => {
        let email = user._json
        let userExists = await userService.getByEmail(email.email)
        if (userExists) {
            const token = jwt.sign({ email: email.email, role: userExists.role, user: userExists.username, avatar: userExists.avatar }, process.env.JWT_SECRET,{ expiresIn: 60*60*24*7});
            return done(null, {token: token})
        }
        else {
            let body = {
                username: user.displayName,
                email: email.email,
                age: 18,
                password: randomPassword,
                avatar: user.photos[0].value,
            }
            let newUser = await userService.create(body)
            const token = jwt.sign({ email: email.email, role: newUser.role }, process.env.JWT_SECRET,{ expiresIn: 60*60*24*7});
            return done(null, { token: token });
        }
    }
    )
    )
    passport.authenticate("jwt", { session: false })

}

