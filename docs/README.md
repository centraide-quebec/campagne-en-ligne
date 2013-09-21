## Comment faire rouler le projet sur votre poste de travail

### Uniformisation de l'environnement de travail

Ce projet utilise *Vagrant* pour standardiser l'environnement de développement.

Il nous permet donc monter rapidement un environnement de développement sans configurer
quoi que ce soit sur notre poste de travail.

#### Comment le faire fonctionner ?

1. Installez [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
2. Installez [Vagrant](http://downloads.vagrantup.com/)
3. Utilisez la ligne de commande pour vous rendre dans le dossier *vagrant*
4. Tapez la commande suivante:

<pre>vagrant up</pre>

5. Vous verrez défiler une série de commande à l'écran
6. Lorsque ce sera terminé, tapez l'adresse suivante dans votre navigateur

<pre>localhost:8080</pre>

    *Vagrant* utilise Ubuntu Precise 64 bit pour sa machine virtuel. Si vous
    éprouvez des problèmes d'installation avec *Vagrant*, il se peut fort bien
    que vous devrez utiliser la version 32 bit. Vous n'avez alors qu'à modifier
    les lignes 6 et 8 du fichier /vagrant/Vagrantfile; changer le 64 pour un 32.

#### Et ensuite ?

Vous pouvez continuer à travailler sur votre poste dans le dossier *src* sans vous soucier de la machine virtuelle qui vient d'être créé.

Lorsque vous désirez vous rendre dans la machine virtuelle:

    vagrant ssh

Lorsque vous voulez **arrêter** la machine virtuelle:

    vagrant halt

Lorsque vous voulez la **redémarrer** pour travailler à nouveau:

    vagrant reload

Lorsque vous voulez **détruire** la machine virtuelle:

    vagrant destroy

    *Toutes les commandes ci-dessous doivent être éxécutés dans le dossier /vagrant*

#### Les dossiers importants sur la VM

* répertoire hébergeant le code source: */var/www/laravel*.
* répertoire des logs d'erreurs: */var/logs/apache2/*
