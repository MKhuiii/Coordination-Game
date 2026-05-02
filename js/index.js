function startGame(mode){
    const container = document.querySelector(".body-container")
    container.innerHTML = ""
    choosingStage()
}
choseStrategy = []
function choosingStage(){
    const container = document.querySelector(".body-container")
    container.innerHTML = ""
    container.style.flexDirection = "column"
    container.style.alignItems = "center"

    const title = document.createElement("div")
    title.className = "title"
    title.innerHTML = "Choose Strategies"
    container.appendChild(title)

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
    strategyGroup.style.display = "flex"
    strategyGroup.style.flexDirection = "row"
    strategyGroup.style.flexWrap = "wrap"
    strategyGroup.style.justifyContent = "center"
    strategyGroup.style.gap = "20px"
    strategyGroup.style.width = "100%"
    container.appendChild(strategyGroup)
    gameStrategies.forEach(element => {
        const strategy = document.createElement("div")
        strategy.className = "strategy"
        const name = document.createElement("span")
        name.innerHTML = `${element.name}`
        const description = document.createElement("span")
        description.innerHTML = `${element.description}`
        description.className = "strategy-description";
        const img = document.createElement("img")
        img.src = `${element.image}`
        strategy.appendChild(name)
        strategy.appendChild(img)
        strategy.appendChild(description)
        container.append(strategy)
        container.style.flexDirection = "row"
        container.style.flexWrap = "wrap"

        strategy.onclick = function(){
            const index = choseStrategy.indexOf(element.id)
            const startBtn = document.getElementById("final-start-btn");
            if(index === -1){
                if(choseStrategy.length < 2){
                    choseStrategy.push(element.id)
                    console.log(choseStrategy)
                    strategy.style.border = "2px solid red"
                }
            }
            else{
                choseStrategy.splice(index, 1);
                strategy.style.border = "2px solid black"
            }
            if (choseStrategy.length === 2) {
                startBtn.style.display = "block"; 
            } else {
                startBtn.style.display = "none";
            }
        }
    });
}