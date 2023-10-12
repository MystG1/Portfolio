<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $prenom = $_POST["prenom"];
    $nom = $_POST["nom"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Composez le message
    $sujet = "Nouveau message de $prenom $nom";
    $contenu = "Nom: $nom\n";
    $contenu .= "Prénom: $prenom\n";
    $contenu .= "Adresse e-mail: $email\n";
    $contenu .= "Message:\n$message";

    // Adresse e-mail où vous souhaitez recevoir les données
    $destinataire = "contact@gaetan-ferron.com";

    // Entêtes de l'e-mail
    $entetes = "From: $email\r\n";

    // Envoyer l'e-mail
    if (mail($destinataire, $sujet, $contenu, $entetes)) {
        echo "Votre message a été envoyé avec succès.";
    } else {
        echo "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>