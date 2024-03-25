import { Server } from "socket.io";
import { delay } from '../utils/utils.js';
import blackjackGameInstance from "./game/game.js";
import jwt from "jsonwebtoken"
import userService from "./service/index.service.js";
import config from "./config/config.js";

export function configureSocket(server) {
    const socketServer = new Server(server);

    socketServer.use((socket, next) => {
        try {
            let socketURL = socket.handshake.headers.referer;
            let token = socket.handshake.headers.cookie.split('=')[1];
            if (token && socketURL.includes("/blackjack")) {
                let decoded = jwt.verify(token, config.jwt_secret);
                socket.username = decoded.user;
                next();
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    });

    socketServer.on("connection", async (socket) => {
        socket.on("start-game", async (game) => {
            let card = await blackjackGameInstance.orderCard("player");
            socket.emit("petitionPCards", card, );
            await delay(0.75);
            let card2 = await blackjackGameInstance.orderCard("dealer");
            socket.emit("petitionDCards", card2, );
            await delay(0.75);
            let card3 = await blackjackGameInstance.orderCard("player");
            socket.emit("petitionPCards", card3, );
            let card4 = await blackjackGameInstance.orderCard("dealerHide");
        });

        socket.on("ordered-card", async () => {
            let newCard = await blackjackGameInstance.orderCard("player");
            socket.emit("petitionPCards", newCard);
            let result = await blackjackGameInstance.checkScore("both");
            if(result.finish === true) {
                socket.emit("result", result)
            }
        });

        socket.on("stay", async () => {
            let newCard = await blackjackGameInstance.showCard();
            socket.emit("petitionDCards", newCard, 2);
            await delay(1.5)
            let dealerScore = await blackjackGameInstance.score("dealer");
            while (dealerScore <= 16) {
                let newDCard = await blackjackGameInstance.orderCard("dealer");
                dealerScore = await blackjackGameInstance.score("dealer");
                socket.emit("petitionDCards", newDCard, 2);
                await delay(1.5);
            }
            let check1 = await blackjackGameInstance.checkScore("both");
            if(check1.finish === false) {
                let check2 = await blackjackGameInstance.checkScore("comparate");
                socket.emit("result", check2)
            }
            else {
                socket.emit("result", check1)
            }
        });

        socket.on("puntuationTotal", async () => {
            let totalPlayer = await blackjackGameInstance.score("player");
            let totalDealer = await blackjackGameInstance.score("dealer");
            let bet = await blackjackGameInstance.bet
            socket.emit("puntuationDOM", totalPlayer, totalDealer, bet);
        });
    });
}