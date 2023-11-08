// Déclarer les fonctions et variables-----------------------------------------------
function enleverAccents(mot) {
    return mot.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function mute() {
    if (audioMain.paused) {
        audioMain.play();
        $(".mute").text("Couper la musique");
    } else {
        audioMain.pause();
        $(".mute").text("Activer la musique");
    }
}
function win() {
    audioMain.pause();
    $(".clavier, .deviner, .mute, .demute").css("display", "none");
    $("header h1").css("flex-grow","1");
    $(".main").html("<audio class=main src=sons/victory.mp3 autoplay></audio>");
    $("header").css("background-color", "green");
    $(".rejouer").css("display", "flex");
    serie++;
    $(".series").text(serie);
    localStorage.setItem("serie", serie);
    $(".maj").attr('src','images/error/victory.png');
}
function penduPlusUn() {
    erreur++;
    $(".pendu").text(erreur + "/7");
    let cheminImage = 'images/error/error' + erreur + '.png';
    $(".maj").attr('src', cheminImage);
    $(".outch").html("<audio class='click' src='sons/outch.mp3' autoplay></audio>");
}

let audioMain = $(".main")[0];
let audioClick = $(".click")[0];
let erreur = 0;

let choixMusique = localStorage.getItem("switch");
if (choixMusique === null) {
    choixMusique = "0";
}

let serie = localStorage.getItem("serie");
if (serie === null) {
    serie = 0;
}

$(".series").text(serie);
// Les boutons------------------------------------------------------------------------

$(".start").on("click", () => {
    audioClick.play();
    $(".pendu").text(erreur + "/7");
    $(".start").css("display", "none");
    $(".container").fadeIn();
    $(".container").css("display", "block");
    sessionStorage.setItem("relancer", "1");
    start();
});
$(".rejouer").on("click", () => {
    audioClick.play();
    setTimeout(() => {
        location.reload();
    }, 350);
});

$(".mute").on("click", () => {
    mute();
});

// -----------------------------------------------------------------------------------

// Requête AJAX
const url = "https://trouve-mot.fr/api/random";

function start() {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: (data) => {
            let motSansAccents = enleverAccents(data[0].name);
            let leMotCacher = Array(motSansAccents.length).fill('_');
            let afficherLeMotCacher = leMotCacher.join("");
            $(".leMot").text(afficherLeMotCacher);

            $(".deviner").on("click", () => {
                audioClick.play();
                setTimeout(() => {
                    mot = prompt("Quel est le mot selon toi? ");

                    if (mot === null) {
                        return;
                    }
                    if (mot === motSansAccents) {
                        win();
                        $(".leMot").text("Tu as gagné ! Le mot était '" + motSansAccents + "'");

                    } else {
                        alert("C'est faux, +1 erreur");
                        penduPlusUn();

                        if (erreur === 7) {
                            $(".clavier, .deviner, .mute, .demute").css("display", "none");
                            $(".rejouer").css("display", "flex");
                            $("header h1").css("flex-grow","1");
                            $(".leMot").text("Tu as perdu ! Le mot était '" + motSansAccents + "'");
                            $("header").css("background-color", "brown");
                            serie=0;
                            localStorage.setItem("serie", serie);
                            audioMain.pause();
                            $(".main").html("<audio class=main src=sons/death.mp3 autoplay></audio>");
                        }
                    }
                }, 350);
            });
            
            let boutonsClavier = document.querySelectorAll('.clavier button');
            boutonsClavier.forEach(function (bouton) {
                bouton.addEventListener("click", function () {

                    audioClick.play();
                    let guess = bouton.textContent.toLowerCase();
                    bouton.style.opacity = 0;
                    bouton.disabled = true;

                    if (motSansAccents.includes(guess)) {

                        for (let i = 0; i < motSansAccents.length; i++) {
                            if (motSansAccents[i] === guess) {
                                leMotCacher[i] = guess;
                            }
                        }
                    }
                     else {
                        penduPlusUn();
                    }
                    $(".leMot").text(leMotCacher.join(""));

                    if (erreur === 7) {
                        $(".clavier, .deviner, .mute, .demute").css("display", "none");
                        $("header h1").css("flex-grow","1");
                        $(".rejouer").css("display", "flex");
                        $(".leMot").text("Tu as perdu ! Le mot était '" + motSansAccents + "'");
                        $("header").css("background-color", "brown");
                        serie=0;
                        localStorage.setItem("serie", serie);
                        audioMain.pause();
                        $(".main").html("<audio class=main src=sons/death.mp3 autoplay></audio>");
                    }

                    if (leMotCacher.join("") === motSansAccents) {
                        win();
                        $(".leMot").text("Tu as gagné ! Le mot était '" + motSansAccents + "'");
                    }
                });
            });
        },
        error: () => {
            alert("Un problème est survenu");
        }
    });
}

let relancer = sessionStorage.getItem("relancer");
if (relancer === "1") {
    $(".pendu").text(erreur + "/7");
    $(".start").css("display", "none");
    $(".container").fadeIn();
    $(".container").css("display", "block");
    relancer="1";
    sessionStorage.setItem("relancer", relancer);
    start();
}
// ---------------------------------------------------------------------------------

