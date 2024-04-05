import { connect } from "mongoose";
import config from "./config/config.js";
import express from "express"
import { engine } from "express-handlebars"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import passport from "passport";
import inicializePassport from "./config/passport.js"
import router from "./routes/index.router.js";
import cookieParser from "cookie-parser";
import notFoundHandler from "./middlewares/notFound.js";
import { configureSocket } from "./blackjack.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* Configuracion básica del sv */

const server = express()
server.use(express.json())
server.use(express.static(__dirname + '/../public'));
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser(config.secretKey))
server.use("/", router);
server.set("views", __dirname + "/views");
server.set("view engine", "handlebars");
server.use(notFoundHandler)





const ready = () => console.log("Server running in port " + config.port + __dirname)



/* Handlebars & Routers */
const httpServer = server.listen(config.port, ready);
configureSocket(httpServer)
/* SOCKETS */





server.engine("handlebars", engine({
  helpers: {
    comparate: function(valor1, valor2, options) {
      if (valor1 < valor2) {
          return options.fn(this);
      } else {
          return options.inverse(this);
      }
  }
  }
}));

inicializePassport()
server.use(passport.initialize())

/* Conexión mongo DB */

config.connectMDB()

