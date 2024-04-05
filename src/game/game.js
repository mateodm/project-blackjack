import cardsService from "../service/card.service.js";

class blackjackGame {
    constructor() {
        this.baraja = [];
        this.playerCards = [];
        this.dealerCards = [];
        this.dealerHideCard = [];
        this.dealerStay = false;
        this.playerStay = false;
        this.round = 1
        this.bet = 0
        this.winner = "no"
    }
    async startGame() {
        try {
            this.baraja = await cardsService.getAll();
            this.playerCards = [];
            this.dealerCards = [];
            this.dealerHideCard = 0
            this.round = 1
            this.winner = "no"
            return
        }
        catch (e) {
            console.log(e)
        }
    }
    async setBet(bet) {
        try {
            this.bet = bet
        }
        catch(e) {
            console.log(e)
        }
    }
    async stay() {
        let dealerScore = await this.score("dealer")
        if (this.round === 1) {
            this.dealerCards.push(this.dealerHideCard)
            while (dealerScore >= 16) {
                let newDCard = await this.orderCard("dealer")
                dealerScore = await this.score("dealer")
                socket.emit("petitionDCards", newDCard, 2)
                await delay(1)
            }
            return
        }
        else if(this.round === 2) {
            while (dealerScore >= 16) {
                let newDCard = await this.orderCard("dealer")
                dealerScore = await this.score("dealer")
                socket.emit("petitionDCards", newDCard, 2)
                await this.checkScore("both")
                await delay(1)
            }
            return
        }
    }
    async orderCard(who) {
        let random = Math.floor(Math.random() * this.baraja.length)
        let card = this.baraja.splice(random, 1)[0]
        if (who === "dealer") {
            this.dealerCards.push(card)
            return card
        }
        else if (who === "dealerHide") {
            this.dealerHideCard = card
            return card

        }
        else if (who === "player") {
            this.playerCards.push(card)
            return card
        }
    }
    async score(who) {
        let value = 0;
        let asCount = 0; 
        if (who === "dealer") {
            this.dealerCards.forEach(dCard => {
                if (dCard.value === 1) {
                    asCount++;
                }
                value += dCard.value;
            });
        } else if (who === "player") {
            this.playerCards.forEach(pCard => {
                if (pCard.value === 1) {
                    asCount++
                }
                value += pCard.value;
            });
        }
    
        while (asCount > 0 && value + 10 <= 21) {
            value += 10;
            asCount--;
        }
    
        return value;
    }
    async checkScore(check) {
        let playerScore = await this.score("player")
        let dealerScore = await this.score("dealer")
        switch (check) {
            case "both":
                if (dealerScore > 21) {
                    return { finish: true, puntuationD: dealerScore, puntuationP: playerScore, whoLose: "dealer", as: "bancarrota", bet: this.bet};
                } else if (playerScore > 21) {
                    return { finish: true, puntuationP: playerScore, puntuationD: dealerScore, whoLose: "player" , as: "bancarrota", bet: this.bet};
                } else {
                    return { finish: false }; 
                }
            case "comparate":
                if (dealerScore > playerScore) {
                    return { finish: true, puntuationD: dealerScore, puntuationP: playerScore, whoLose: "player", as:"puntuación", bet: this.bet };
                } else if (dealerScore < playerScore) {
                    return { finish: true, puntuationP: playerScore, puntuationD: dealerScore,whoLose: "dealer", as:"puntuación", bet: this.bet};
                } else if (dealerScore === playerScore) {
                    return { finish: true, puntuationP: playerScore, puntuationD: dealerScore, whoLose: "draw", bet: this.bet };
                }
            default:
        }
    }
    async showCard() {
        this.dealerCards = this.dealerCards.concat(this.dealerHideCard);
        return this.dealerHideCard
    }
    async finishGame() {
        this.baraja = await cardsService.getAll();
        this.playerCards = [];
        this.dealerCards = [];
        this.dealerHideCard = 0
        this.round = 1
        this.bet = 0
        return
    }
    async invalidGame() {
        this.baraja = await cardsService.getAll();
        this.playerCards = [];
        this.dealerCards = [];
        this.dealerHideCard = 0
        this.round = 1
        this.bet = 0
        return
    }
}

const blackjackGameInstance = new blackjackGame();
export default blackjackGameInstance;