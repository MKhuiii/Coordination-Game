function clearScreen(mode){
    const container = document.querySelector(".body-container")
    container.innerHTML = ""
}
const gameStrategies = [
    {
        id: 1,
        name: "Tit-for-Tat",
        description: "Starts with Cooperation. In every subsequent round, it repeats the exact move the opponent made in the previous round.",
        image: "./assets/images.jpg"
    },
    {
        id: 2,
        name: "Tit-for-Two-Tats",
        description: "Starts with Cooperation. It only defects if the opponent has defected in both of the last two consecutive rounds.",
        image: "./assets/images.jpg"
    },
    {
        id: 3,
        name: "Two-Tits-for-Tat",
        description: "Starts with Cooperation. If the opponent defects once, it responds by defecting for the next two rounds in a row.",
        image: "./assets/images.jpg"
    },
    {
        id: 4,
        name: "Generous Tit-for-Tat",
        description: "Plays like Tit-for-Tat but includes a 20% random probability of cooperating even when the opponent has just defected.",
        image: "./assets/images.jpg"
    },
    {
        id: 5,
        name: "Gradual",
        description: "Starts with Cooperation. Each time the opponent defects, it retaliates with a sequence of betrayals that increases in length (1st time: 1 round, 2nd time: 2 rounds, etc.), followed by two rounds of Cooperation.",
        image: "./assets/images.jpg"
    },
    {
        id: 6,
        name: "Grim Trigger",
        description: "Starts with Cooperation. It continues to cooperate until the opponent defects exactly once; after that, it defects for all remaining rounds.",
        image: "./assets/images.jpg"
    },
    {
        id: 7,
        name: "Fool Me Once",
        description: "Starts with Cooperation and ignores the first betrayal. If a second betrayal occurs at any point, it switches to permanent Defection until the game ends.",
        image: "./assets/images.jpg"
    },
    {
        id: 8,
        name: "Always Cooperate",
        description: "Chooses Cooperation in every single round, regardless of the opponent's moves or the history of the game.",
        image: "./assets/images.jpg"
    },
    {
        id: 9,
        name: "Always Defect",
        description: "Chooses Betrayal/Defection in every single round, regardless of the opponent's moves or the history of the game.",
        image: "./assets/images.jpg"
    },
    {
        id: 10,
        name: "Detective",
        description: "Executes a fixed opening: [Coop, Defect, Coop, Coop]. If the opponent never retaliates against the betrayal, it switches to Always Defect. Nếu đối thủ có đánh trả, nó chuyển sang chơi Tit-for-Tat.",
        image: "./assets/images.jpg"
    },
    {
        id: 11,
        name: "Prober",
        description: "Starts by defecting in the first round. If the opponent retaliates in the second round, it plays Tit-for-Tat. If the opponent does not retaliate, it continues to defect.",
        image: "./assets/images.jpg"
    },
    {
        id: 12,
        name: "Joss",
        description: "Plays the Tit-for-Tat logic but has a 10% chance in any round to switch a Cooperation move into a Defection move.",
        image: "./assets/images.jpg"
    },
    {
        id: 13,
        name: "Handshake",
        description: "Defects in round 1 and Cooperates in round 2. If the opponent's first two moves match this sequence, it cooperates forever; otherwise, it defects forever.",
        image: "./assets/images.jpg"
    },
    {
        id: 14,
        name: "Pavlov",
        description: "Repeats its last move if it and the opponent made the same choice (both Coop or both Defect). If the choices were different, it switches to the opposite of its last move.",
        image: "./assets/images.jpg"
    },
    {
        id: 15,
        name: "Win-Stay, Lose-Shift",
        description: "Retains its current choice as long as the opponent cooperates. If the opponent defects, it immediately switches its action for the next round.",
        image: "./assets/images.jpg"
    },
    {
        id: 16,
        name: "Adaptive",
        description: "Plays a fixed set of moves initially. It then calculates which of its own actions yielded the highest average score during that period and uses only that action for the rest of the game.",
        image: "./assets/images.jpg"
    },
    {
        id: 17,
        name: "Sneaky",
        description: "Attempts an early betrayal. If the opponent retaliates, it performs a fixed sequence of Cooperation rounds as an 'apology' before returning to its primary logic.",
        image: "./assets/images.jpg"
    },
    {
        id: 18,
        name: "Random",
        description: "Decides between Cooperation and Defection in every round using a 50/50 probability, ignoring all game history.",
        image: "./assets/images.jpg"
    }
]

function choosingStage(){
    clearScreen()
    choseStrategy = []
    const container = document.querySelector(".body-container")
    const startBtn = document.getElementById("final-start-btn");
    
    container.innerHTML = ""
    container.style.flexDirection = "column"
    container.style.alignItems = "center"

    const title = document.createElement("div")
    title.className = "title"
    title.innerHTML = "Choose Strategies"
    container.appendChild(title)

    const topButtons = document.createElement("div")
    topButtons.style.display = "flex"
    topButtons.style.gap = "20px"
    topButtons.style.marginBottom = "20px"

    container.appendChild(topButtons)

    const turnArea = document.createElement("div")
    turnArea.className = "turn-selection-area"

    const label = document.createElement("label")
    label.innerHTML = "<b>Number of Rounds:</b>"
    label.setAttribute("for", "turn-input")

    const input = document.createElement("input")
    input.type = "number"
    input.id = "turn-input"
    input.value = "10"
    input.min = "1"
    input.max = "1000"

    turnArea.appendChild(label)
    turnArea.appendChild(input)
    container.appendChild(turnArea)

    const strategyGroup = document.createElement("div")
    strategyGroup.className = "strategy-group"
    container.appendChild(strategyGroup)

    gameStrategies.forEach(element => {
        const strategy = document.createElement("div")
        strategy.className = "strategy"
        
        const name = document.createElement("span")
        name.innerHTML = `${element.name}`
        
        const description = document.createElement("span")
        description.innerHTML = `${element.description}`
        description.className = "strategy-description"
        
        const img = document.createElement("img")
        img.src = `${element.image}`
        
        strategy.appendChild(name)
        strategy.appendChild(img)
        strategy.appendChild(description)
        
        strategyGroup.appendChild(strategy)

        strategy.onclick = function() {
            const index = choseStrategy.indexOf(element.id)
            if(index === -1) {
                if(choseStrategy.length < 2) {
                    choseStrategy.push(element.id)
                    strategy.classList.add("selected")
                }
            } else {
                choseStrategy.splice(index, 1)
                strategy.classList.remove("selected")
            }
            
            if (choseStrategy.length === 2) {
                startBtn.style.display = "block"; 
            } else {
                startBtn.style.display = "none";
            }
        }
    });

    startBtn.onclick = function(){
        battleStage(input.value, choseStrategy)
    }
}

function battleStage(totalTurn, strategiesList){
    clearScreen()
    const player1 = new strategyMap[strategiesList[0]]()
    const player2 = new strategyMap[strategiesList[1]]()
    battle = new BattleGame(player1, player2, totalTurn)
    battle.gameStart()
}