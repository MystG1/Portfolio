// Fonction qui enlève les accents du (mot)
function enleverAccents(mot) {
    return mot.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
// Requête AJAX
const url = "https://trouve-mot.fr/api/random";

function start() {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: (data) => {
            // Transforme le mot généré en mot sans accent 
            let motSansAccents = enleverAccents(data[0].name);

            // génère un tableau avec un caractère "_" pour chaque lettre du mot précédent
            let leMotCacher = Array(motSansAccents.length).fill('_');

            // Transforme le tableau en une chaine de caractère avec un espace entre chaque valeurs "_ _ _ _ _" 
            let afficherLeMotCacher = leMotCacher.join("");

            // Affiche la chaine de caractère "_ _ _ _" sur le site
            $(".leMot").text(afficherLeMotCacher);

            // Variable erreur qui déterminera quand est-ce que le joueur perd
           
            let erreur = 0;
            $(".pendu").text(erreur + "/7");

            $(".deviner").on("click", () => {
                $(".click").html("<audio class='click' src='sons/click.mp3' autoplay></audio>");
                setTimeout(() => {
                mot=prompt("Quel est le mot selon toi? ");
                if (mot === null) {
                    return; // Ne fait rien si l'utilisateur a annulé
                }
                if (mot===motSansAccents){
                    $("header").css("background-color", "green");
                    $(".clavier").css("display", "none");
                    $(".rejouer").css("display", "auto");
                    $(".leMot").text("Tu as gagné ! Le mot était '" + motSansAccents + "'");

                }else{
                    alert("C'est faux, +1 erreur");
                    // On rajoute 1 au compteur d'erreur
                erreur++;
                $(".pendu").text(erreur + "/7");
                // On charge l'image correspond au nombre d'erreur (1 erreur = 1 morceau du pendu)
                let cheminImage = 'images/error/error' + erreur + '.png';
                $(".maj").attr('src', cheminImage);
                $(".click").html("<audio class='click' src='sons/outch.mp3' autoplay></audio>");
                }}, 350);
                
            });
            // On stock toutes les touches du clavier dans une variable "boutonsClaviers"
            let boutonsClavier = document.querySelectorAll('.clavier button');

            // Pour chaque boutons présent dans la variable :
            boutonsClavier.forEach(function (bouton) {

                // On ajoute un évènement "click" qui va stocker dans une variable "guess" la valeur de la touche appuyé en MINUSCULE.
                bouton.addEventListener("click", function () {
                    let guess = bouton.textContent.toLowerCase();
                    bouton.style.opacity=0;
                    bouton.disabled=true;
                   

                    // Si le mot a deviner contient la valeur de la variable "Guess"
                    if (motSansAccents.includes(guess)) {

                        // On crée une boucle qui va parcourir chaque caractère de notre motSansAccents 
                        for (let i = 0; i < motSansAccents.length; i++) {

                            // Si le caracètre a la position [i] correspond a la valeur et au type de notre variable "Guess"
                            if (motSansAccents[i] === guess) {

                                // on remplace la valeur "_" du caractère a la position [i] de leMotCacher par la valeur de "Guess"
                                leMotCacher[i] = guess;

                            }
                        }
                        // Si la lettre selectionnée n'est pas présente dans le mot a deviner 
                    } else {
                        // On rajoute 1 au compteur d'erreur
                        erreur++;
                        $(".pendu").text(erreur + "/7");
                        // On charge l'image correspond au nombre d'erreur (1 erreur = 1 morceau du pendu)
                        let cheminImage = 'images/error/error' + erreur + '.png';
                        $(".maj").attr('src', cheminImage);
                        $(".click").html("<audio class='click' src='sons/outch.mp3' autoplay></audio>");

                    }
                    // On actualise le mot cacher pour que les lettres découverte apparraissent
                    $(".leMot").text(leMotCacher.join(""));

                    // Si le compteur d'erreur atteint 7
                    if (erreur === 7) {
                        $(".clavier").css("display", "none");
                        $(".rejouer").css("display", "flex");
                        $(".leMot").text("Tu as perdu ! Le mot était '" + motSansAccents + "'");
                        $("header").css("background-color", "brown");
                        $(".deviner").css("display", "none");
                        let audioMain=document.querySelector(".main");
                        audioMain.pause();
                        $(".main").html("<audio class=main src=sons/death.mp3 autoplay></audio>");
                    }

                    // Si le tableau leMotCacher, une fois convertis en chaine de caractère, est égal au mot sans accents
                    if (leMotCacher.join("") === motSansAccents) {
                        $("header").css("background-color", "green");
                        $(".clavier").css("display", "none");
                        $(".rejouer").css("display", "auto");
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
// ---------------------------------------------------------------------------------
$(".start").on("click", () => {
    $(".click").html("<audio class=click src=sons/click.mp3 autoplay></audio>");
    $(".start").css("display", "none");
    $(".container").fadeIn();
    $(".container").css("display", "block");
    start();
});


$(".rejouer").on("click", () => {
    $(".click").html("<audio class='click' src='sons/click.mp3' autoplay></audio>");
    setTimeout(() => {
        location.reload();
    }, 350);
});

