const gameStrategies = [
    {
        id: 1,
        name: "Tit-for-Tat",
        description: "The Fair Player: Honest and straightforward. It always starts with cooperation (0). From then on, it simply copies whatever you did in the previous round.",
        image: "./assets/images.jpg"
    },
    {
        id: 2,
        name: "Tit-for-Two-Tats",
        description: "The Patient Player: A more forgiving version of Tit-for-Tat. It only retaliates if you betray it in both of the last two consecutive rounds. It overlooks single mistakes to maintain peace.",
        image: "./assets/images.jpg"
    },
    {
        id: 3,
        name: "Two-Tits-for-Tat",
        description: "The Strict Player: Very firm. If you betray it even once, it will immediately hit back with two consecutive betrayals (1) to deter you before returning to cooperation.",
        image: "./assets/images.jpg"
    },
    {
        id: 4,
        name: "Generous Tit-for-Tat",
        description: "The Kind Heart: Like Tit-for-Tat but with a big heart. When betrayed, there is a 20% chance it will still choose to cooperate (0) to avoid a cycle of mutual revenge.",
        image: "./assets/images.jpg"
    },
    {
        id: 5,
        name: "Gradual",
        description: "The Escalator: Punishes more severely each time it is betrayed. The first betrayal earns 1 retaliatory move, the second earns 2, and so on, always ending with two calm rounds.",
        image: "./assets/images.jpg"
    },
    {
        id: 6,
        name: "Grim Trigger",
        description: "The Grudge-Holder: Friendly until provoked. It cooperates until you betray it just once—after that, it will betray you until the game ends without ever forgiving you.",
        image: "./assets/images.jpg"
    },
    {
        id: 7,
        name: "Fool Me Once",
        description: "The Second-Chancer: Similar to Grim Trigger but slightly more tolerant. It gives you one chance to fix your mistake, but a second betrayal triggers permanent retaliation.",
        image: "./assets/images.jpg"
    },
    {
        id: 8,
        name: "Always Cooperate",
        description: "The Angel: Always chooses to cooperate (0) no matter what happens, even if you repeatedly betray it to gain a higher score.",
        image: "./assets/images.jpg"
    },
    {
        id: 9,
        name: "Always Defect",
        description: "The Villain: Always chooses to betray (1). Its only goal is to never be exploited, and it is happy to step over the cooperation of others.",
        image: "./assets/images.jpg"
    },
    {
        id: 10,
        name: "Detective",
        description: "The Investigator: Plays a fixed sequence [0, 1, 0, 0] to analyze you. If you fight back, it plays Tit-for-Tat. If you are passive, it becomes Always Defect to bully you.",
        image: "./assets/images.jpg"
    },
    {
        id: 11,
        name: "Prober",
        description: "The Aggressor: Starts by betraying you [1, 0, 0] to test your reaction. If you don't retaliate, it views you as prey. If you fight back, it plays fairly like Tit-for-Tat.",
        image: "./assets/images.jpg"
    },
    {
        id: 12,
        name: "Joss",
        description: "The Sneaky Player: Plays like Tit-for-Tat but occasionally (10%) betrays you out of nowhere just to see if it can squeeze out extra points.",
        image: "./assets/images.jpg"
    },
    {
        id: 13,
        name: "Handshake",
        description: "The Secret Society: Looks for an ally by playing [1, 0]. If you play the same, it cooperates forever. If not, it views you as an enemy and betrays you constantly.",
        image: "./assets/images.jpg"
    },
    {
        id: 14,
        name: "Pavlov (Simpleton)",
        description: "The Pragmatist: Acts based on the last result. If the last round gave high points, it repeats the move. If points were low, it switches to the opposite action.",
        image: "./assets/images.jpg"
    },
    {
        id: 15,
        name: "Win-Stay, Lose-Shift",
        description: "The Result-Oriented: Similar to Pavlov. It sticks to its strategy if it's winning (opponent cooperated) and shifts if it's losing (opponent betrayed).",
        image: "./assets/images.jpg"
    },
    {
        id: 16,
        name: "Adaptive",
        description: "The Algorithm: Experimentally plays at the start, calculates which action (0 or 1) yielded more points, and then focuses on that action for the rest of the game.",
        image: "./assets/images.jpg"
    },
    {
        id: 17,
        name: "Sneaky",
        description: "The Regretful Cheater: Tries to betray early for an advantage. If you retaliate harshly, it immediately returns to cooperation to 'apologize' and calm the situation.",
        image: "./assets/images.jpg"
    },
    {
        id: 18,
        name: "Random",
        description: "The Madman: Completely illogical. Every round it flips a 50/50 coin to decide between 0 or 1. No one can predict or influence this player.",
        image: "./assets/images.jpg"
    }
];

class Strategy{
    constructor(){
        this.history = []
        this.enemyHistory = []
        this.punishCount = 0
    }
    decide() {}
    updateInfo(myDecide, enemyDecide){
        this.history.push(myDecide)
        this.enemyHistory.push(enemyDecide)
    }
    get turn(){
        return this.history.length + 1
    }
}

class AlwaysCooperate extends Strategy{
    decide(){
        return 0
    }
}

class AlwaysDefect extends Strategy{
    decide(){
        return 1
    }
}

class TitForTat extends Strategy{
    decide(){
        let myDecide = 0
        if(this.turn !== 1){
            myDecide = this.enemyHistory[this.enemyHistory.length - 1]
        }
        return myDecide
    }
}

class TitForTwoTat extends Strategy{
    decide(){
        let myDecide = 0
        if(this.turn > 2){
            let i = this.enemyHistory.length - 1
            if(this.enemyHistory[i] === 1 && this.enemyHistory[i - 1] === 1){
                myDecide = 1
            }
        }
        return myDecide
    }
}

class TwoTitsForTat extends Strategy{
     decide(){
        let myDecide = 0
        if(this.turn > 2){
            let i = this.enemyHistory.length - 1
            if (this.punishTurn > 0){
                myDecide = 1
                this.punishTurn--
            }
            else if(this.enemyHistory[i] === 1){
                myDecide = 1
                pushTurn = 1
            }
        }
        return myDecide
    }
}

class GenerousTitForTat extends Strategy{
    decide(){
        let myDecide = 0
        if(this.enemyHistory[this.enemyHistory.length - 1] === 1){
            if(Math.random < 0.2){
                myDecide = 0
            }
            else{
                myDecide = 1
            }
        }
        return myDecide
    }
}