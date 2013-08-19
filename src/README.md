## Centraide - Campagne en ligne

Voici le dossier de l'application lui-même.

Le framework utilisé est [Laravel](http://laravel.com/).

Ces dépendances de base sont installés automatiquement via la création de la machine virtuel.

Vous devez ensuite lui indiquer de construire le reste de ces dépendances comme indiqué dans la section suivante.

### Construire le projet et le voir à l'oeuvre

1. Rendez vous dans le dossier */src/laravel*
2. Tapez la commande suivante:

    composer install --prefer-dist

3. *Composer* prends un certain à tout télécharger, mais il finit par débloquer. Vous verrez alors apparaître un dossier *vendor* dans le dossier */src/laravel*
4. Tapez l'adresse suivante dans votre navigateur

    localhost:8080