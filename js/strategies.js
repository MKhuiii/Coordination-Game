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
    updateInfo(myMove, enemyMove){
        this.history.push(myMove)
        this.enemyHistory.push(enemyMove)
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

class TitForTwoTats extends Strategy{
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
                this.punishTurn = 1
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

class Gradual extends Strategy{
    constructor() {
        super()
        this.betrayedTimes = 0 
        this.calmRounds = 0 
    }
    decide(){
        let myDecide = 0
        if(this.turn === 1) return myDecide
        const i = this.enemyHistory.length - 1
        if(this.punishCount > 0){
            myDecide = 1
            this.punishCount--
        }
        else if(this.calmRounds > 0){
            this.calmRounds--
        }
        else if(this.enemyHistory[i] === 1){
            if(this.punishCount === 0 && this.calmRounds === 0){
                this.betrayedTimes++
                this.punishCount = this.betrayedTimes - 1
                this.calmRounds = 2
                myDecide = 1
            }
        }
        return myDecide
    }
}

class GrimTrigger extends Strategy{
    constructor(){
        super()
        this.isTrigger = false
    }
    decide(){
        let myDecide = 0
        if(this.isTrigger){
            myDecide = 1
        }
        if(this.enemyHistory[this.enemyHistory.length - 1] === 1){
            this.isTrigger = true
        }
        return myDecide
    }
}

class FoolMeOnce extends Strategy{
    constructor(){
        super()
        this.betrayedTimes = 0
    }
    decide(){
        let myDecide = 0
        if(this.enemyHistory[this.enemyHistory.length - 1] === 1){
            if(this.betrayedTimes < 2){
                this.betrayedTimes++
            }
        }
        if(this.betrayedTimes >= 2){
            myDecide = 1
        }
        return myDecide
    }
}

class Detective extends Strategy{
    constructor(){
        super()
        this.isEnemyBetrayed = false
    }
    decide() {
        const probing = [0, 1, 0, 0]
        const currentTurn = this.turn

        if (currentTurn <= 4) {
            return probing[currentTurn - 1]
        }

        this.isEnemyBetrayed = this.enemyHistory.slice(0, 4).includes(1)

        if (this.isEnemyBetrayed) {
            return this.enemyHistory[this.enemyHistory.length - 1]
        } else {
            return 1
        }
    }
}

class Prober extends Strategy {
    constructor() {
        super()
        this.isExploitable = false
    }

    decide() {
        const probing = [1, 0, 0]
        const currentTurn = this.turn

        if (currentTurn <= 3) {
            return probing[currentTurn - 1]
        }

        if (currentTurn === 4) {
            if (this.enemyHistory[0] === 0 && this.enemyHistory[1] === 0) {
                this.isExploitable = true
            }
        }

        if (this.isExploitable) {
            return 1
        }

        return this.enemyHistory[this.enemyHistory.length - 1]
    }
}

class Joss extends Strategy{
    decide(){
        if(this.turn == 1){
            return 0
        }
        if(this.enemyHistory[this.enemyHistory.length - 1] === 0){
            return Math.random() <= 0.1 ? 1 : 0
        }
        return 1
    }
}
class Handshake extends Strategy {
    constructor() {
        super()
    }

    decide() {
        const signal = [1, 0]
        const currentTurn = this.turn

        if (currentTurn <= 2) {
            return signal[currentTurn - 1]
        }

        const isAlly = this.enemyHistory[0] === 1 && this.enemyHistory[1] === 0
        
        if (isAlly) {
            return 0
        }
        return 1
    }
}

class Pavlov extends Strategy {
    constructor() {
        super()
    }

    decide() {
        if (this.turn === 1) return 0
        
        const myLastMove = this.history[this.history.length - 1]
        const enemyLastMove = this.enemyHistory[this.enemyHistory.length - 1]

        if (myLastMove === enemyLastMove) {
            return 0
        }
        return 1
    }
}

class WinStayLoseShift extends Strategy {
    constructor() {
        super()
    }

    decide() {
        if (this.turn === 1) return 0

        const myLastMove = this.history[this.history.length - 1]
        const enemyLastMove = this.enemyHistory[this.enemyHistory.length - 1]

        if (enemyLastMove === 0) {
            return myLastMove
        } else {
            return myLastMove === 0 ? 1 : 0
        }
    }
}

class Adaptive extends Strategy {
    constructor() {
        super()
        this.cooperateScore = 0
        this.defectScore = 0
    }

    decide() {
        const currentTurn = this.turn
        
        if (currentTurn > 1) {
            const lastMyMove = this.history[this.history.length - 1]
            const lastEnemyMove = this.enemyHistory[this.enemyHistory.length - 1]
            let score = 0
            
            if (lastMyMove === 0 && lastEnemyMove === 0) score = 1
            else if (lastMyMove === 1 && lastEnemyMove === 0) score = 2
            else if (lastMyMove === 0 && lastEnemyMove === 1) score = -1
            else score = -1

            if (lastMyMove === 0) this.cooperateScore += score
            else this.defectScore += score
        }

        if (currentTurn <= 5) return 0
        if (currentTurn <= 10) return 1

        return this.defectScore > this.cooperateScore ? 1 : 0
    }
}

class Sneaky extends Strategy {
    constructor() {
        super()
    }

    decide() {
        const currentTurn = this.turn
        
        if (currentTurn <= 2) return 1
        
        const enemyRetaliated = this.enemyHistory.includes(1)
        
        if (enemyRetaliated && currentTurn <= 5) {
            return 0
        }
        
        return this.enemyHistory[this.enemyHistory.length - 1]
    }
}

class Random extends Strategy{
    decide(){
        return (Math.random() <= 0.5) ? 1 : 0
    }
}

const strategyMap = {
    1: TitForTat,
    2: TitForTwoTats,
    3: TwoTitsForTat,
    4: GenerousTitForTat,
    5: Gradual,
    6: GrimTrigger,
    7: FoolMeOnce,
    8: AlwaysCooperate,
    9: AlwaysDefect,
    10: Detective,
    11: Prober,
    12: Joss,
    13: Handshake,
    14: Pavlov,
    15: WinStayLoseShift,
    16: Adaptive,
    17: Sneaky,
    18: Random
}