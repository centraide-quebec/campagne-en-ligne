Uniformisation de l'environnement de travail
============================================

Ce dossier contient un fichier de configuration *vagrant*.

Il permet de monter rapidement un environnement de développement sans configurer
quoi que ce soit sur notre poste de travail.

Dans le futur, si nous désirons utiliser une base de données MySQL avec des
données fictives, ce sera facile de la créer rapidement.

Comment le faire fonctionner ?
------------------------------

1. Installez [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
2. Installez [vagrant](http://downloads.vagrantup.com/)
3. Utilisez la ligne de commande pour vous rendre dans le dossier *vagrant*
4. Tapez la commande suivante:

<pre>vagrant up</pre>

5. Vous verrez défiler une série de commande à l'écran
6. Lorsque ce sera terminé, tapez l'adresse suivante dans votre navigateur

<pre>localhost:8080</pre>

Et ensuite ?
------------

Vous pouvez continuer à travailler dans le dossier *code* sans vous soucier de la machine virtuelle qui vient d'être créé.

Lorsque vous voulez **arrêter** la machine virtuelle:

<pre>vagrant halt</pre>

Lorsque vous voulez la **redémarrer** pour travailler à nouveau:

<pre>vagrant reload</pre>

Lorsque vous voulez **détruire** la machine virtuelle:

<pre>vagrant destroy</pre>
