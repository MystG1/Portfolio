$(".creation button").hide();
$(".creation button").fadeIn();

$(document).on("click", ".b1", () => {
    $(".creation h1").text("Mini-jeux");
    $(".creation p").text("Voici les mini-jeux que j'ai développés.");
    $(".creation button").fadeOut();

    setTimeout(() => {
        $(".b3, .b4").remove();
        $(".b1").addClass("bBack").removeClass("game");
        $(".b2").addClass("bPendu").removeClass("portfolio");
        $(".bBack").text("Retour");
        $(".bBack").css("background-image", "none");
        $(".bBack").css("background-color", "black");
        $(".bPendu").text("Le pendu");
        $(".bPendu").css("background-image", "url(../images/bFond5.png)");
    }, 350);

    $(".creation button").fadeIn();
});

$(document).on("click", ".bBack", () => {
    location.reload();
})
$(document).on("click", ".bPendu", () => {
    document.location.href = "https://gaetan-ferron.com/pendu.html";
});
$(document).on("click", ".b2", () => {
    document.location.href = "https://gaetan-ferron.com/portfolio.html";
});
