//Variablen definieren und somit die DOM Element später zu manipulieren
var menü = document.querySelector(".menü");
var grid = document.querySelector(".grid");
var scoreComputer = document.querySelector(".scoreComputer");
var scoreUser = document.querySelector(".scoreUser");
var gamefield = document.querySelector(".gamefield");
var easyButton = document.getElementById("easyButton");
var middleButton = document.getElementById("middleButton");
var hardButton = document.getElementById("hardButton");
var winMessage = document.querySelector(".winMessage");
var replay = document.querySelector("#replay");
var afterGame = document.querySelector("#afterGame");
//Boolean Werte
var playerBo = false;
var computerBo = true;
//Sobald auf den easyButton geklickt wird, verschwindet die Menübox
//und das Spielfled erscheint. Anschließend werden die Karten generiert
//und im DOM sichtbar. Der Button ist nur einmal anklickbar,
//damit sich bei weiterem klicken darauf, keine neue Karten generieren.
easyButton.addEventListener("click", function () {
    gamefield.setAttribute("style", "display:unset");
    menü.setAttribute("style", "display:none");
    cardGenerator();
    setTimeout(function () {
        computer();
    }, 1000);
    easyButton.disabled = true;
});
//leere Arrays
var openCards = [];
var hiddenArray = [];
var scoreComputerArray = [];
var scorePlayerArray = [];
var userIndex = [];
//Karten Array LEICHT
var cards = [
    {
        icon: "fas fa-cat",
        colour: "#F78181",
        text: "",
        key: "karte1"
    },
    {
        icon: "fas fa-cat",
        colour: "#F78181",
        text: "",
        key: "karte2"
    },
    {
        icon: "fas fa-dragon",
        colour: "#F5DA81",
        text: "",
        key: "karte3"
    },
    {
        icon: "fas fa-dragon",
        colour: "#F5DA81",
        text: "",
        key: "karte4"
    },
    {
        icon: "fas fa-fish",
        colour: "#81F781",
        text: "",
        key: "karte5"
    },
    {
        icon: "fas fa-fish",
        colour: "#81F781",
        text: "",
        key: "karte6"
    },
    {
        icon: "fas fa-horse",
        colour: "#819FF7",
        text: "",
        key: "karte7"
    },
    {
        icon: "fas fa-horse",
        colour: "#819FF7",
        text: "",
        key: "karte8"
    }
];
//Computer
//Kann zufällige Indexe aus meinem Kartenarray wählen und ausgeben.
//Pusht die random Indexe in ein leeres randomArray.
//In diesem werden die zwei Indexe verglichen ob sie gleich sind oder nicht.
//Wenn diese gleich sind wird die function nocheinmal aufgerufen, bis die if-condition erfüllt ist.
//Somit kann der Computer nicht eine Karten zwei mal aufdecken.
function computer() {
    setTimeout(function () {
        var random1 = Math.floor(Math.random() * cards.length);
        var random2 = Math.floor(Math.random() * cards.length);
        var randomCard1 = cards[random1];
        var randomCard2 = cards[random2];
        var card1 = document.querySelector(".card" + random1);
        var card2 = document.querySelector(".card" + random2);
        console.log(random1);
        console.log(random2);
        var randomArray = [];
        randomArray.push(random1);
        randomArray.push(random2);
        console.log(randomArray);
        //randomArray Indexe dürfen nicht gleich sein.
        if (randomArray[0] != randomArray[1]) {
            //random Karte1 muss die Klasse "hidden" besitzen.
            if (card1.classList.contains("hidden")) {
                computer();
                //random Karte2 muss die Klasse "hidden" besitzen.
            }
            else if (card2.classList.contains("hidden")) {
                computer();
                //Wenn dise nicht diese Klassen besitzen wird die Funktion 
                //element und time mit den jeweiligen randome Karten als
                //Argument ausgeführt.
            }
            else {
                element(random1);
                element(random2);
                time(random1);
                time(random2);
                randomArray = [];
            }
            //Wenn beide random Indexe gleich sind, wir die computer Funktion
            //nocheinmal aufgerufen. Das passiert solange bis er die if condition erfüllt.
            //Sprich zwei unterschiedliche Indexe auswählt.   
        }
        else {
            computer();
        }
    }, 200);
}
//Funktion time dreht die geklickte Karte nach einer bestimmten Zeit wieder um.
function time(index) {
    var card = document.querySelector(".card" + index);
    setTimeout(function () {
        card.innerHTML = "";
        card.style.backgroundColor = "grey";
    }, 1000);
}
//Schleife die das Grid mit den Array Objekten befüllt. Erzeugtes DIVElement  bekommt die Objekte aus dem Array,
//als auch eine Hintergrundfarbe die als Rückseite erscheint.
function cardGenerator() {
    var _loop_1 = function (index) {
        var card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("card" + index);
        card.style.backgroundColor = "grey";
        grid.appendChild(card);
        card.addEventListener("click", function () {
            if (playerBo == true) {
                userIndex.push(index);
                console.log(userIndex);
            }
            if (userIndex.length == 1 && playerBo == true) {
                computerBo = false;
                element(index);
                console.log(element);
            }
            else if (userIndex.length == 2) {
                if (userIndex[0] == userIndex[1]) {
                    userIndex.pop();
                }
                else {
                    element(index);
                    userIndex = [];
                    console.log(userIndex);
                }
            }
        });
    };
    for (var index = 0; index < cards.length; index++) {
        _loop_1(index);
    }
}
function element(index) {
    if (hiddenArray.length < 2) {
        var card = document.querySelector(".card" + index);
        card.innerHTML = "<i class='" + cards[index].icon + "'></i>";
        card.style.backgroundColor = cards[index].colour;
        openCards.push(cards[index].colour);
        openCards.push(cards[index].key);
        console.log(openCards);
        hiddenArray.push(card);
        console.log(hiddenArray);
        addClickedCards(index);
    }
}
//Erzeugte DIVs (Karten) werden beim neu laden der Seite/Spiels durcheinander angeordnet. Dabei bekommen die Index Plätze random die Werte zugeschrieben.
function randomizeArray() {
    cards.sort(function () { return 0.5 - Math.random(); });
}
randomizeArray();
function addClickedCards(index) {
    if (openCards.length == 4) {
        matchingCards();
    }
}
//if/else
function matchingCards() {
    setTimeout(function () {
        if (openCards[0] == openCards[2] && openCards[1] != openCards[3]) {
            hiddenArray[0].classList.add("hidden");
            hiddenArray[1].classList.add("hidden");
            console.log(openCards[0] == openCards[2] && openCards[1] != openCards[3]);
            openCards = [];
            hiddenArray = [];
            if (cards.length != 0 && computerBo == true) {
                scoreComputerArray.push(1);
                counter();
                computer();
                hiddenArray = [];
                openCards = [];
            }
            if (computerBo == false) {
                scorePlayerArray.push(1);
                counter();
                hiddenArray = [];
                openCards = [];
            }
        }
        else {
            if (computerBo == true && playerBo == false) {
                setTimeout(function () {
                    playerBo = true;
                }, 1000);
                hiddenArray = [];
                openCards = [];
            }
            else if (computerBo == false && playerBo == true) {
                hiddenArray[0].innerHTML = "";
                hiddenArray[1].innerHTML = "";
                hiddenArray[0].style.backgroundColor = "grey";
                hiddenArray[1].style.backgroundColor = "grey";
                setTimeout(function () {
                    computerBo = true;
                    hiddenArray = [];
                    openCards = [];
                    console.log(computerBo);
                    console.log(playerBo);
                    console.log(hiddenArray);
                    console.log(openCards);
                    playerBo = false;
                    computer();
                }, 1000);
            }
        }
    }, 500);
}
//Zähler
function counter() {
    var res = scorePlayerArray.length + scoreComputerArray.length;
    scoreComputer.innerHTML = "Score" + scoreComputerArray.length;
    scoreUser.innerHTML = "Score" + scorePlayerArray.length;
    if (res == 4) {
        afterGame.setAttribute("style", "display:unset");
        gamefield.setAttribute("style", "display:none");
        if (scoreComputerArray.length > scorePlayerArray.length) {
            winMessage.innerHTML = "YOU LOSE";
        }
        else if (scoreComputerArray.length == scorePlayerArray.length) {
            winMessage.innerHTML = "DRAW";
        }
    }
}
//Replay: click function auf dem Button lässt die Seite neu laden.
//Dadurch gelangen wir wieder auf die "Startseite" bzw. Anfangssituation.
replay.addEventListener("click", function () {
    location.reload();
});
//# sourceMappingURL=script.js.map