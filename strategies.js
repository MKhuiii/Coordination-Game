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