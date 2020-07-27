let player = [];
var gamers = [];
let dice;
var buttonPressed = false;
let currentPlayer = 0;
let questions;
let askedQuestion = [];
var currentQuestion;
var snakeLadder = {
    snakeBite: [48, 67, 74, 79, 83, 96],
    snakeLand: [28, 24, 52, 59, 19, 76],
    ladderClimb: [8, 18, 27, 60, 68],
    ladderLand: [13, 65, 46, 61, 89]
}

var color = ['red', 'green', 'yellow', 'blue', 'pink', 'black']

function init() {
    var board = document.getElementById("board")
    var table = document.getElementById("table-board")
    var count = 100;

    var boxClr = getRandomColor();

    for (var i = 0; i < 5; i++) {
        let tr = document.createElement('tr')

        for (var j = 0; j < 10; j++) {
            let td = document.createElement('td')


            td.id = `box${count}`
            td.append(`${count}`)
            td.append(generateCircle())
            count = count - 1;
            if (count % 2 === 0) {
                td.style.backgroundColor = '#ececfc'
            }
            else {
                td.style.backgroundColor = boxClr
            }
            tr.append(td)
        }
        count = count - 9;

        let tr2 = document.createElement('tr')

        for (var j = 0; j < 10; j++) {

            let td = document.createElement('td')
            td.id = `box${count}`
            td.append(`${count}`)
            td.append(generateCircle())
            count = count + 1;
            if (count % 2 === 0) {
                td.style.backgroundColor = '#ececfc'
            }
            else {
                td.style.backgroundColor = boxClr
            }
            tr2.append(td)
        }

        count = count - 11;

        table.append(tr)
        table.append(tr2)

    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateCircle() {
    let circleHolder = document.createElement('div')
    let red = document.createElement('div')
    let green = document.createElement('div')
    let yellow = document.createElement('div')
    let blue = document.createElement('div')
    let pink = document.createElement('div')
    let black = document.createElement('div')

    red.classList.add('red')
    green.classList.add('green')
    yellow.classList.add('yellow')
    blue.classList.add('blue')
    pink.classList.add('pink')
    black.classList.add('black')

    red.style.display = 'none'
    green.style.display = 'none'
    yellow.style.display = 'none'
    blue.style.display = 'none'
    pink.style.display = 'none'
    black.style.display = 'none'

    circleHolder.classList.add('circleholder')

    circleHolder.append(red)
    circleHolder.append(green)
    circleHolder.append(yellow)
    circleHolder.append(blue)
    circleHolder.append(pink)
    circleHolder.append(black)

    return circleHolder;
}

function setTotalPlayers() {

    for (var i = 0; i < player.length; i++) {

        var totalPlayerDisplay = document.getElementById('total-player-display')
        var pbox = document.createElement('div')
        var pname = document.createElement('div')
        var namelabel = document.createElement('label')
        var pposi = document.createElement('div')
        var posilabel = document.createElement('label')

        namelabel.id = ('tplayer' + i)
        posilabel.id = ('tposi' + i)

        namelabel.innerHTML = player[i];
        posilabel.innerHTML = 1;

        pbox.classList.add('player-box')
        pname.classList.add('player-name')
        pposi.classList.add('player-posi')

        pposi.style.backgroundColor = color[i]

        pposi.append(posilabel)
        pname.append(namelabel)
        pbox.append(pname)
        pbox.append(pposi)
        totalPlayerDisplay.append(pbox)
    }
}

init()

function addPlayer(pname) {
    console.log("Vanakkam " + pname)

    player.push(pname);

    var pleft = 6 - player.length

    if (pleft === 0) {
        document.getElementById('player-name').disabled = true;
        document.getElementById('player-submit').disabled = true;
    }

    document.getElementById('player-name').value = ''

    document.getElementById('left-player').innerHTML = (pleft + " Players Left!")

    if (player.length > 0) {

        document.getElementById('start-btn').disabled = false;
        var loopname = "";
        for (var i = 0; i < player.length; i++) {
            loopname = loopname + player[i] + " ";
        }

        document.getElementById('added-players').innerHTML = loopname
    }
}

function startGame() {

    let gamer = {
        name: '',
        currentPosi: 1,
        diceCount: 0
    }

    for (var i = 0; i < player.length; i++) {
        gamers.push(Object.create(gamer))
    }

    for (var j = 0; j < player.length; j++) {

        gamers[j].name = player[j]
    }
    initFirstPosi()
    checkGame()
}

function initFirstPosi() {
    var box1 = document.getElementById('box1')

    for (var i = 0; i < player.length; i++) {
        box1.getElementsByClassName(color[i])[0].style.display = 'flex'
    }
}

function launchgame() {
    document.getElementById('addplayer').style.display = "none";
    document.getElementById('first-box').style.display = "none";
    setTotalPlayers()
    startGame()
}

function checkWinner(gamer) {
    if (gamer.currentPosi >= 100) {
        return true
    }
    return false;
}

function checkGame() {
    if (gamers.some(checkWinner)) {
        //winner found
        console.log("winner found")
        document.getElementById('btn-roll').disabled = true
        document.getElementById('first-box').style.display = 'flex'
        document.getElementById('winner-announce').style.display = 'block'
        document.getElementById('winner-name').innerHTML = "Winner is " + gamers[currentPlayer].name;

        for (var i = 0; i < player.length; i++) {

            if (i != currentPlayer) {

                var plbox = document.createElement('div')
                var plname = document.createElement('div')
                var plposi = document.createElement('div')
                var namepl = document.createElement('label')
                var posipl = document.createElement('label')

                plbox.classList.add('player-box')
                plname.classList.add('player-name')
                plposi.classList.add('player-posi')

                namepl.innerHTML = gamers[i].name
                posipl.innerHTML = gamers[i].currentPosi

                plname.append(namepl)
                plposi.append(posipl)
                plbox.append(plname)
                plbox.append(plposi)

                document.getElementById('announce-box').append(plbox)
            }
        }

        //game end
    } else {
        //startgame
        console.log('new game begins')
        generateQuestion()
        updateCurrentPlayer(currentPlayer)
    }
}

function updateCurrentPlayer(index) {
    document.getElementById('current-player').innerHTML = (gamers[index].name);
    document.getElementById('current-posi').innerHTML = "at " + (gamers[index].currentPosi);
}

function dicerollvalue() {

    dice = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice').src = './assets/dice-' + dice + '.png';

    gamers[currentPlayer].diceCount = dice;

    updateBoard(currentPlayer);
}

function updateBoard(curr) {

    var boxid = 'box' + (gamers[curr].currentPosi)
    var prevBox = document.getElementById(boxid)
    prevBox.getElementsByClassName(color[curr])[0].style.display = 'none'
    gamers[curr].currentPosi = gamers[curr].currentPosi + gamers[curr].diceCount;
    // checkSnakeLadder(curr)

    if (gamers[curr].currentPosi >= 100) {
        var winnerBox = document.getElementById('box100')
        winnerBox.getElementsByClassName(color[curr])[0].style.display = 'flex'
        var cposition = document.getElementById('tposi' + curr)
        var cpname = document.getElementById('tplayer' + curr)
        cpname.innerHTML = gamers[curr].name + ' is the Winner'
        cpname.style.color = 'green'
        cpname.style.fontWeight = 700;
        cposition.innerHTML = '100';

    } else if (snakeLadder.ladderClimb.some(element => element == gamers[curr].currentPosi)) {

        var newLand = snakeLadder.ladderLand[snakeLadder.ladderClimb.findIndex(element => element == gamers[curr].currentPosi)]

        var cpname = document.getElementById('tplayer' + curr)
        cpname.innerHTML = gamers[curr].name + ' got climb at ' + (gamers[curr].currentPosi)
        gamers[curr].currentPosi = newLand;
        boxid = 'box' + (gamers[curr].currentPosi)

        var currentBox = document.getElementById(boxid)
        currentBox.getElementsByClassName(color[curr])[0].style.display = 'flex'
        updateTotalPlayer(curr)

        if (curr != (player.length - 1)) {
            currentPlayer++;
        } else {
            currentPlayer = 0;
        }

    } else if (snakeLadder.snakeBite.some(element => element == gamers[curr].currentPosi)) {
        var newLand = snakeLadder.snakeLand[snakeLadder.snakeBite.findIndex(element => element == gamers[curr].currentPosi)]

        var cpname = document.getElementById('tplayer' + curr)
        cpname.innerHTML = gamers[curr].name + ' got bitten at ' + (gamers[curr].currentPosi)
        gamers[curr].currentPosi = newLand;
        boxid = 'box' + (gamers[curr].currentPosi)

        var currentBox = document.getElementById(boxid)
        currentBox.getElementsByClassName(color[curr])[0].style.display = 'flex'
        updateTotalPlayer(curr)

        if (curr != (player.length - 1)) {
            currentPlayer++;
        } else {
            currentPlayer = 0;
        }
    } else {
        boxid = 'box' + (gamers[curr].currentPosi)

        var currentBox = document.getElementById(boxid)
        currentBox.getElementsByClassName(color[curr])[0].style.display = 'flex'
        updateTotalPlayer(curr)

        if (curr != (player.length - 1)) {
            currentPlayer++;
        } else {
            currentPlayer = 0;
        }
    }

    checkGame()
}

function updateTotalPlayer(curr) {
    var cposition = document.getElementById('tposi' + curr)
    cposition.innerHTML = gamers[curr].currentPosi;
}

function loadQuestion() {
    fetch('question.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            questions = json;
            console.log("Questions count " + questions.length);
        })
        .catch(function () {
            this.dataError = true;
        })
}

loadQuestion()

function generateQuestion() {


    document.getElementById('next-btn').style.display = 'none'
    document.getElementById('remark').style.display = 'none'
    document.getElementById('btn-roll').disabled = true
    document.getElementById('answer-btn').disabled = false
    document.getElementById('question-small-box').style.display = "block";

    currentQuestion = Math.floor(Math.random() * Math.floor(questions.length + 1));

    if (askedQuestion.length >49) {
        console.log("questions first round done")
        askedQuestion = [];
        console.log('the length of askwed question ' + askedQuestion.length)
    }

    if (askedQuestion.length > 0) {
        console.log("in thsi ocndition")
        while (askedQuestion.some(element => element == currentQuestion)) {
            currentQuestion = Math.floor(Math.random() * Math.floor(questions.length + 1));
        }
    }

    askedQuestion.push(currentQuestion)

    document.getElementById('question-for').innerHTML = "Question For " + gamers[currentPlayer].name

    if (questions[currentQuestion]) {
        document.getElementById('question-part').innerHTML = questions[currentQuestion].question
        document.getElementsByName('mcq')[0].nextSibling.nodeValue = questions[currentQuestion].a
        document.getElementsByName('mcq')[1].nextSibling.nodeValue = questions[currentQuestion].b
        document.getElementsByName('mcq')[2].nextSibling.nodeValue = questions[currentQuestion].c
        document.getElementsByName('mcq')[3].nextSibling.nodeValue = questions[currentQuestion].d
    } else {
        console.log("error found, redirect to checkgame")
        checkGame()
    }

    console.log("question answer is " + questions[currentQuestion].answer)
}

function getAnswer() {
    var mcq = document.querySelector("input[name=mcq]:checked")
    var remark = document.getElementById('remark');
    console.log(askedQuestion)
    if (mcq) {
        document.getElementById('answer-btn').disabled = true
        if (mcq.value == questions[currentQuestion].answer) {
            remark.innerHTML = "Correct Answer, You Can Roll The Dice";
            remark.style.color = 'green'
            remark.style.display = 'block'
            document.getElementById('proceed-btn').style.display = 'block'
        } else {
            remark.innerHTML = `Wrong! Answer is ${questions[currentQuestion].answer.toUpperCase()}, You Can't Roll The Dice. Skip to Next Player`;
            remark.style.color = 'red'
            remark.style.display = 'block'
            document.getElementById('next-btn').style.display = 'block'
        }
    } else {
        alert("You didnt select any answer")
    }
    mcq.checked = false
}

function proceed() {
    document.getElementById('proceed-btn').style.display = 'none'
    document.getElementById('btn-roll').disabled = false
}

function nextPlayer() {
    if (currentPlayer != (player.length - 1)) {
        currentPlayer++;
    } else {
        currentPlayer = 0;
    }

    generateQuestion()
    updateCurrentPlayer(currentPlayer)
}