const gamesUrl = "http://localhost:3000/games/"
let gamesData = []
let selectedGame = 0
document.getElementById("high-score-form").addEventListener("submit", (e) => updateHighScore(e))
// <#1> fetch data and list the name (manufacturer) of each
// game in the #game-list, each element should be h5
fetch(gamesUrl)
.then(resp => resp.json())
.then(resp => setGamesData(resp))
.catch(err => console.log(err))

function setGamesData(games) {
    gamesData = games
    gamesData.forEach((game) => addGameToList(game))
    // <#2> on page load, show first game in detail
    displayDetail(games[0])
}

function addGameToList(game) {
    const newLi = document.createElement("h5")
    newLi.textContent = `${game.name} (${game.manufacturer_name})`
    newLi.id = game.id
    // <#3> when a game name is clicked, detail should show
    newLi.addEventListener("click", () => displayDetail(game))
    document.getElementsByClassName("game-list")[0].appendChild(newLi)
    
}

function displayDetail(game) {
    selectedGame = game.id
    document.getElementById("detail-image").src = game.image
    document.getElementById("detail-title").textContent = game.name
    document.getElementById("detail-high-score").textContent = game.high_score
}


// <#4 and goal>when entering a high score in submit form,
// it should show in the detail, and that
// detail should persist in the browser but 
// not in the database
function updateHighScore(e) {
    e.preventDefault()
    gamesData[selectedGame-1].high_score = document.getElementById("score-input").value
    e.target.reset()
    displayDetail(gamesData[selectedGame-1])
}