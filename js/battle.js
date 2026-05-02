class BattleGame {
    player1Point = 0
    player2Point = 0
    constructor(player1, player2, totalTurn) {
        this.player1 = player1
        this.player2 = player2
        this.totalTurn = totalTurn
    }

    compare(movep1, movep2) {
        if (movep1 === 0 && movep2 === 0) {
            this.player1Point += 1
            this.player2Point += 1
            return [1, 1]
        } else if (movep1 === 1 && movep2 === 0) {
            this.player1Point += 2
            this.player2Point -= 1
            return [2, -1]
        } else if (movep1 === 0 && movep2 === 1) {
            this.player1Point -= 1
            this.player2Point += 2
            return [-1, 2]
        } else {
            this.player1Point -= 1
            this.player2Point -= 1
            return [-1, -1]
        }
    }

    gameOver() {
        if (this.player1Point === this.player2Point) return 0
        return (this.player1Point > this.player2Point) ? 1 : 2
    }

    createBattleUI() {
        const container = document.querySelector(".body-container")
        container.innerHTML = `
            <div class="battle-screen">
                <div class="score-board">
                    <div class="player-score" id="p1-score-display">P1: 0</div>
                    <div class="vs-text">VS</div>
                    <div class="player-score" id="p2-score-display">P2: 0</div>
                </div>
                <div id="battle-log" class="battle-log"></div>
                <div id="final-result" class="final-result"></div>
                <button class="start-btn" onclick="location.reload()" style="margin-top:20px">Play Again</button>
            </div>
        `
    }

    async gameStart() {
        const startBtn = document.getElementById("final-start-btn");
        if (startBtn) startBtn.style.display = "none";

        this.createBattleUI();
        const logContainer = document.getElementById("battle-log");
        const p1Display = document.getElementById("p1-score-display");
        const p2Display = document.getElementById("p2-score-display");
        
        let currentTurn = 1;
        while (currentTurn <= this.totalTurn) {
            let movep1 = this.player1.decide();
            let movep2 = this.player2.decide();
            
            this.player1.updateInfo(movep1, movep2);
            this.player2.updateInfo(movep2, movep1);
            
            this.compare(movep1, movep2);
            
            const turnRow = document.createElement("div");
            turnRow.className = "turn-row";
            
            const iconP1 = movep1 === 0 ? '<i class="fa-solid fa-handshake color-cooperate"></i>' : '<i class="fa-solid fa-hand-fist color-defect"></i>';
            const iconP2 = movep2 === 0 ? '<i class="fa-solid fa-handshake color-cooperate"></i>' : '<i class="fa-solid fa-hand-fist color-defect"></i>';
            
            turnRow.innerHTML = `
                <span>Turn ${currentTurn}</span>
                <div class="moves-display">
                    <span class="move">${iconP1}</span>
                    <span class="move">${iconP2}</span>
                </div>
            `;
            logContainer.prepend(turnRow);
            
            p1Display.innerText = `P1: ${this.player1Point}`;
            p2Display.innerText = `P2: ${this.player2Point}`;
            
            await new Promise(resolve => setTimeout(resolve, 500));
            currentTurn++;
        }

        const resultDiv = document.getElementById("final-result");
        let battleResult = this.gameOver();
        if (battleResult === 0) resultDiv.innerText = "Draw!";
        else resultDiv.innerText = `P${battleResult} Won!`;
    }
}