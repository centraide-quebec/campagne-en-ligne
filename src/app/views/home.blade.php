@extends('layouts.master')

@section('content')
    <section class="c6">
        <h2>Dernière activité</h2>

        <ul class="news double vignette">
            <li>
                <img width="50" height="50" alt="Gabrielle Bernatchez" src="assets/images/bidon/employes/gabrielle.jpeg">
                <span class="title"><strong>Frédéric Bolduc</strong> a donné 10$</span>
                <span class="time">Il y a 2 heures</span>
            </li>

            <li>
                <img width="50" height="50" alt="Audrey Marcotte-Dubuc" src="assets/images/bidon/employes/audrey.jpg">
                <span class="title"><strong>Audrey Marcotte-Dubuc</strong> a donné 22$</span>
                <span class="time">Il y a 1 jour</span>
            </li>

            <li>
                <img width="50" height="50" alt="Nicolas Roberge" src="assets/images/bidon/employes/nicolas.jpeg">
                <span class="title"><strong>Nicolas Roberge</strong> a donné 15$</span>
                <span class="time">Il y a 3 jours</span>
            </li>

            <li>
                <img width="50" height="50" alt="Frédéric Bolduc" src="assets/images/bidon/employes/fred.jpg">
                <span class="title"><strong>Frédéric Bolduc</strong> a donné 45$</span>
                <span class="time">Il y a 1 semaine</span>
            </li>

        </ul>

        <hr class="clear">

        <a class="loader" href="#">...</a>

    </section>

    <section class="pagination c6">

        <h2>Classement</h2>

        <div id="tabs">

            <ul class="resp-tabs-list">
                <li>Toutes les entreprises</li>
                <li>Meilleurs donateurs</li>
            </ul>

            <div class="table resp-tabs-container">

                <div>

                    <div class="row header">

                        <div class="c3 division">
                            <select>
                                <option value="0">Choisir une division</option>
                                <option value="1">Blablabla</option>
                                <option value="2">En ouin ? ayoye</option>
                                <option value="3">Yesesir</option>
                            </select>
                        </div>
                        <div class="c1 don-moyen">
                            Don moyen par contributeur
                        </div>
                        <div class="c1 totale">
                            Contribution totale
                        </div>
                        <hr class="clear">

                    </div>

                    <ol class="content">

                        <li>
                            <div class="c3 entreprise vignette">
                                <span class="index"><strong>1</strong></span>
                                <img width="50" height="50" alt="Evollia" src="assets/images/bidon/entreprise/evollia.png">
                                <strong class="title">Evollia</strong>
                            </div>
                            <div data-title="Don moyen par contributeur" class="c1 don-moyen">
                                <strong>158 $</strong>
                            </div>
                            <div data-title="Contribution totale" class="c1 totale">
                                <strong>10 293 $</strong>
                            </div>
                            <div class="c1 suivie">
                                <span><a href="#" class="bt-suivie select">Suivre</a></span>
                            </div>
                            <hr class="clear">
                        </li>

                        <li>
                            <div class="c3 entreprise vignette">
                                <span class="index"><strong>2</strong></span>
                                <img width="50" height="50" alt="MC | Chef" src="assets/images/bidon/entreprise/mcchef.jpeg">
                                <strong class="title">MC | Chef</strong>
                            </div>
                            <div data-title="Don moyen par contributeur" class="c1 don-moyen">
                                <strong>132 $</strong>
                            </div>
                            <div data-title="Contribution totale" class="c1 totale">
                                <strong>9 281 $</strong>
                            </div>
                            <div class="c1 suivie">
                                <span><a href="#" class="bt-suivie select">Suivre</a></span>
                            </div>
                            <hr class="clear">
                        </li>

                        <li>
                            <div class="c3 entreprise vignette">
                                <span class="index"><strong>3</strong></span>
                                <img width="50" height="50" alt="Ovologic" src="assets/images/bidon/entreprise/ovologic.jpg">
                                <strong class="title">Ovologic</strong>
                            </div>
                            <div data-title="Don moyen par contributeur" class="c1 don-moyen">
                                <strong>96 $</strong>
                            </div>
                            <div data-title="Contribution totale" class="c1 totale">
                                <strong>6 921 $</strong>
                            </div>
                            <div class="c1 suivie">
                                <span><a href="#" class="bt-suivie">Suivre</a></span>
                            </div>
                            <hr class="clear">
                        </li>

                        <li>
                            <div class="c3 entreprise vignette">
                                <span class="index"><strong>4</strong></span>
                                <img width="50" height="50" alt="Croisière AML" src="assets/images/bidon/entreprise/aml.png">
                                <strong class="title">Croisière AML</strong>
                            </div>
                            <div data-title="Don moyen par contributeur" class="c1 don-moyen">
                                <strong>78 $</strong>
                            </div>
                            <div data-title="Contribution totale" class="c1 totale">
                                <strong>4 918 $</strong>
                            </div>
                            <div class="c1 suivie">
                                <span><a href="#" class="bt-suivie">Suivre</a></span>
                            </div>
                            <hr class="clear">
                        </li>

                    </ol>

                </div>


                <div>

                    <div class="row header">

                        <div class="c3 division">
                            <select>
                                <option value="0">Choisir une division</option>
                                <option value="1">Blablabla</option>
                                <option value="2">En ouin ? ayoye</option>
                                <option value="3">Yesesir</option>
                            </select>
                        </div>
                        <div class="c1 don-moyen">
                            Don moyen par contributeur
                        </div>
                        <div class="c1 totale">
                            Contribution totale
                        </div>
                        <hr class="clear">

                    </div>

                    <ol>
                        <li>
                            <div class="c3 entreprise vignette">
                                <span class="index"><strong>1</strong></span>
                                <img width="50" height="50" alt="Gabrielle Bernatchez" src="assets/images/bidon/employes/gabrielle.jpeg">
                                <strong class="title">Gabrielle Bernatchez</strong>
                                <a href="/evollia.php" title="Voir la fiche de l'entreprise Evollia" class="time">Evollia</a>

                            </div>
                            <div data-title="Don moyen par contributeur" class="c1 don-moyen">
                                <strong>68 $</strong>
                            </div>
                            <div data-title="Contribution totale" class="c1 totale">
                                <strong>4321 $</strong>
                            </div>
                            <div class="c1 suivie">
                                <span><a href="#" class="bt-suivie">Suivre</a></span>
                            </div>
                            <hr class="clear">
                        </li>

                        <li>
                            <div class="c3 entreprise vignette">
                                <span class="index"><strong>2</strong></span>
                                <img width="50" height="50" alt="Frédéric Bolduc" src="assets/images/bidon/employes/fred.jpg">
                                <strong class="title">Frédéric Bolduc</strong>
                                <a href="/evollia.php" title="Voir la fiche de l'entreprise MC | Chef" class="time">MC | Chef</a>
                            </div>
                            <div data-title="Don moyen par contributeur" class="c1 don-moyen">
                                <strong>54 $</strong>
                            </div>
                            <div data-title="Contribution totale" class="c1 totale">
                                <strong>3121 $</strong>
                            </div>
                            <div class="c1 suivie">
                                <span><a href="#" class="bt-suivie">Suivre</a></span>
                            </div>
                            <hr class="clear">
                        </li>

                        <li>
                            <div class="c3 entreprise vignette">
                                <span class="index"><strong>3</strong></span>
                                <img width="50" height="50" alt="Audrey Marcotte-Dubuc" src="assets/images/bidon/employes/audrey.jpg">
                                <strong class="title">Audrey Marcotte-Dubuc</strong>
                                <a href="/evollia.php" title="Voir la fiche de l'entreprise Evollia" class="time">Evollia</a>
                            </div>
                            <div data-title="Don moyen par contributeur" class="c1 don-moyen">
                                <strong>35 $</strong>
                            </div>
                            <div data-title="Contribution totale" class="c1 totale">
                                <strong>298 $</strong>
                            </div>
                            <div class="c1 suivie">
                                <span><a href="#" class="bt-suivie select">Suivre</a></span>
                            </div>
                            <hr class="clear">
                        </li>

                        <li>
                            <div class="c3 entreprise vignette">
                                <span class="index"><strong>4</strong></span>
                                <img width="50" height="50" alt="Nicolas Roberge" src="assets/images/bidon/employes/nicolas.jpeg">
                                <strong class="title">Nicolas Roberge</strong>
                                <a href="/evollia.php" title="Voir la fiche de l'entreprise Ovologic" class="time">Ovologic</a>
                            </div>
                            <div data-title="Don moyen par contributeur" class="c1 don-moyen">
                                <strong>14 $</strong>
                            </div>
                            <div data-title="Contribution totale" class="c1 totale">
                                <strong>189 $</strong>
                            </div>
                            <div class="c1 suivie">
                                <span><a href="#" class="bt-suivie">Suivre</a></span>
                            </div>
                            <hr class="clear">
                        </li>

                    </ol>

                </div>

            </div>

        </div>


        <div class="page_navigation"></div>

    </section>
@stop