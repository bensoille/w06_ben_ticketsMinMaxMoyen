# W06 :: Ben :: Exercice JavaScript :: customersOrdersMinMax #
*Parcourir une base données de commandes clients pour identifier les tickets mini et maxi, par client*

[Voir une démo ici] (https://bensoille.github.io/w06_ben_ticketsMinMaxMoyen/ "Démo en ligne") par exemple

---

## Exercices ##

Pour faire ces exercices, **faites un fork de ce dépôt**, et réalisez votre boulot dans vos branches, dans votre fork.
Puis mergez dans le master de votre fork, de préférence avec l'option `--no-ff`
Ces branches seront nommées à votre convenance, mais de préférence faisant mention de l'exercice en cours.
exemples : *ben/exo1/ajout_marquage_rouge_js* , *ben/exo1/changement_teinte_rouge*


### Exercice 1 ###
Colorez en rouge les lignes du tableau dont le minimum est < 5€
Eventuellement, passez le texte de la ligne en gras

### Exercice 2 ###
Ajoutez une colonne au tableau qui contient le montant moyen par client.

Rappel :
Pour calculer une moyenne, on fait :
ticketMoyen = ( somme des montants vus ) / ( nombre de montants vus )

Hints :
Il suffit d'ajouter ce calcul au bon endroit pour le collecter comme les autres valeurs min et max
Et puis il faut ajouter une colonne dans le html

### Exercice 3 ###
Ajoutez au tableau une colonne qui donne le nombre de prix vus qui étaient < 5€, par client

### Exercice 4 ###
Ajoutez un bouton "min max globaux" en bas de page qui, quand il est cliqué, affiche les valeurs minimum et maximum vues, globalement.
C'est à dire pour TOUS les clients

Puis, ajoutez un bouton "moyenne globale" qui affiche la moyenne des montants vus, pour TOUS les clients

Hint :
L'affichage de ces valeurs globales pourrait consister en des div masqués, qu'on pourrait afficher avec un effet de fondu, et dans lesquels on pourrait coller les valeurs globales par un `document.getElementById().innerHTML = 'valeur`

### Exercice 5 ###
Faites les modifications nécessaires pour permettre la construction dynamique de la table html :
On veut pouvoir envoyer le nombre de champs qu'on veut, et que la table se construise en fonction ; **le nombre de colonnes peut varier**



# Et comme dit mon épouse : "Merguez dans le master !!" #
