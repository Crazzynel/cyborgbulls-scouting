function saveScouterName() {
    const scouterName = document.getElementById('scouterName').value;
    console.log(scouterName)
// Variable scoutername supposée enregistrer le nom du scouteur.
}

function navigateToPitScouting() {
    // Ajoute le code pour naviguer vers la page de scouting pit
    console.log('Navigating to Pit Scouting');
    window.location.href="./execute_scout/pit/page.html"
    
}

function navigateToMatchScouting() {
    // Ajoute le code pour naviguer vers la page de scouting match
    console.log('Navigating to Match Scouting');
    window.location.href="./execute_scout/match/page.html"
    // win
}

/// CHAMP ADMIS POUR LES CONSOLE.LOG - LOGS MANUEL permettant de se retrouver dans les modes de developpement.
console.error("Licence: Absente")

/// FIN DE CHAMP



// Team list is stocked on the folder named "teams"