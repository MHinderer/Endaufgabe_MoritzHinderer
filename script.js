//Karten Array
var cards = [
    {
        icon: "fas fa-cat",
        colour: "#F78181",
        text: ""
    },
    {
        icon: "fas fa-cat",
        colour: "#F78181",
        text: ""
    },
    {
        icon: "fas fa-dragon",
        colour: "#F5DA81",
        text: ""
    },
    {
        icon: "fas fa-dragon",
        colour: "#F5DA81",
        text: ""
    },
    {
        icon: "fas fa-fish",
        colour: "#81F781",
        text: ""
    },
    {
        icon: "fas fa-fish",
        colour: "#81F781",
        text: ""
    },
    {
        icon: "fas fa-horse",
        colour: "#819FF7",
        text: ""
    },
    {
        icon: "fas fa-horse",
        colour: "#819FF7",
        text: ""
    }
];
//Variablen definieren und das DOM Element verknüpfen
var grid = document.querySelector(".grid");
var scoreComputer = document.querySelector(".scoreComputer");
var scoreUser = document.querySelector(".scoreUser");
var _loop_1 = function (index) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundColor = "grey";
    card.addEventListener("click", function () {
        card.innerHTML = "<i class='" + cards[index].icon + "'></i>";
        card.style.backgroundColor = cards[index].colour;
        setTimeout(function () {
            card.innerHTML = "";
            card.style.backgroundColor = "grey";
        }, 1000);
    });
    grid.appendChild(card);
};
//Schleife die das Grid mit den Array Objekten befüllt. Erzeugtes DIVElement  bekommt die Objekte aus dem Array, als auch eine Hintergrundfarbe die als Rückseite erscheint. 
for (var index = 0; index < cards.length; index++) {
    _loop_1(index);
}
//Erzeugte DIVs (Karten) werden beim neu laden der Seite/Spiels durcheinander angeordnet. Dabei bekommen die Index Plätze random die Werte zugeschrieben.
function randomizeArray() {
    cards.sort(function () { return 0.5 - Math.random(); });
}
randomizeArray();
// Array für die zwei geklickten Karten der Spieler. In diesem Array werden die Karten verglichen ob sie ein Paar sind oder nicht.
//var openedCards: Value[] = [];
//
//grid.addEventListener("click", function (event): void {
//    const clickTarget = event.target;
//    console.log(clickTarget);
//    if (clickTarget.classList.contains("card") && !openedCards.includes(clickTarget)) {
//        addClickedCards(clickTarget);
//    }
//});
//
//function addClickedCards(clickedTarget): void {
//    openedCards.push();
//    if (openedCards.length === 2) {
//        matchingCards();
//    }
//}
//
//function matchingCards(): void {
//    if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
//        console.log("we have a match");
//        openedCards = [];
//        endGame();
//    } else {
//        console.log(openedCards[0].firstElementChild.classList);
//        console.log(openedCards[1].firstElementChild.classList);
//        console.log("no match");
//        setTimeout(function (): void {
//            openedCards[0].classList.toggle("open");
//            openedCards[0].classList.toggle("show");
//            openedCards[1].classList.toggle("open");
//            openedCards[1].classList.toggle("show");
//            openedCards = [];
//        },         1000);
//    }
//}
// Karten vergleichen
//const checkMatch: string = (icons) => {
//    if (icons[0] === icons[1]) {
//        console.log("it's a match");
//        return true;
//    }
//};
//# sourceMappingURL=script.js.map