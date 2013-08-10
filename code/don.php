<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<title>Mon site</title>
	<link href='http://fonts.googleapis.com/css?family=Enriqueta:400,700|Asap:400,700|Shadows+Into+Light' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="style.css" />
	
	<!--[if lt IE 9]>
	<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->


</head>
<body>


<div id="page" class="container">

	<aside id="sidebar">

		<section class="wrapper en-tete-aside">

			<header>

				<img width="90" alt="Logo de Centraide Québec et Chaudière-Appalache" src="/images/logo-centraide.png">
				<h1>Votre campagne en ligne</h1>

			</header>

			<a class="bt-rose" href="#" title="Faire un don">Faire un don</a>

		</section>

		<section class="wrapper">

			<div class="vignette profil">
				<img title="Evollia" src="http://placehold.it/100x100">
				<strong class="title">Evollia</strong>
				<span class="time">Division Technologies</span>
			</div>

			<div id="settings">

				<a class="inbox" title="Boîte de réception" href="#">Boîte de réception <span>5</span></a>
				<a class="notes" title="Notes" href="#">Notes <span>12</span></a>
				<a class="settings" title="Paramètres" href="#">Paramètres</a>
				<a class="logout" title="Déconnexion" href="#">Déconnexion</a>

			</div>
			
		</section>

		<section id="dashboard">

			<a class="tableauBord" title="Tableau de bord" href="#">Tableau de bord</a>
			<a class="rapport" title="Rapport" href="#">Rapport</a>
			<a class="inviter" title="Inviter des employés à donner" href="#">Inviter des employés à donner</a>

		</section>

		<section class="wrapper">

			<h2>Progression de la campagne</h2>

			<div id="thermo">

				<div id="avancement"></div>

			</div>

		</section>

	</aside>

	<header class="banner">

		<img class="entreprise-banner" src="http://placehold.it/830x246">
		<div class="vignette">
			<img title="Evollia" src="http://placehold.it/180x180">
		</div>

	</header>

	<div id="content">

		<hr class="clear">

		<form id="fDon" class="c5">

			<fieldset>

				<section>

				<legend><h2>Je désire faire un...</h2></legend>

					<a class="bt-gris" title="Don récurrent" href="#">Don récurrent</a>

					<h3>Par paie, je veux donner...</h3>

					<div id="wrapper-slider">
						<div id="montant"></div>
						<div id="priceBox"></div>
					</div>

					<div class="autre-montant">
						<span>Ou</span>
						<label class="visuallyhidden">Autre montant</label>
						<input type="text" name="autreMontant" placeholder="$">
					</div>

					<hr class="clear">

					<div id="reelDon">

						<h3 class="funkyH">Coût réel de votre don (après crédit d'impôt)*</h3>

						<div>
							<header>
								<span>Par paie</span>
								<span>Par année</span>
							</header>
							<div>
								<span>6,39 $</span>
								<span>166,02 $</span>
							</div>
						</div>

						<p>* Un reçu sera émis par votre employeur pour un don de 10$ et plus.</p>

					</div>

				</section>

				<section>

					<div id="tabs">

						<h3 class="funkyH">Le moyen le plus rapide de donner !</h3>

						<ul class="resp-tabs-list">
							<li>Déduction à la paie</li>
						</ul>

						<div class="resp-tabs-container wrapper">

							<div>

								<div class="division">

									<p>Nombre de paie par année : 24 paies (aux 15 jours)</p>

									<select class="confidentialite">
										<option value="0">Paramètre de confidentialité</option>
										<option value="1">Rester anonyme</option>
										<option value="2">Afficher mon nom seulement</option>
										<option value="3">Afficher mon nom et le montant ($) de mon don</option>
									</select>
								</div>

								<hr class="clear">

							</div>

						</div>

					</div>

				</section>

			</fieldset>

			<fieldset>

				<legend><h2>Vérification de vos renseignements</h2></legend>


			</fieldset>

			<fieldset>

				<legend><h2>Vos coordonnées</h2></legend>

				<p class="c3">
					<label for="champPrenom">Prénom</label>
					<input type="text" name="champPrenom" id="champPrenom" value="">
				</p>
				<p class="c3">
					<label for="champNom">Nom</label>
					<input type="text" name="champNom" id="champNom" value="">
				</p>
				<p>
					<label for="champAdresse">Adresse</label>
					<input class="small-input" type="text" name="champAdresse" id="champAdresse" value="">
				</p>
				<hr class="clear">
				<p>
					<label for="champVille">Ville</label>
					<input class="small-input" type="text" name="champVille" id="champVille" value="">
				</p>
				<hr class="clear">
				<p class="division">
					<label for="champProvince">Province</label>
					<select name="province">
						<option value="" selected="selected">Province</option>
						<option value="AB">Alberta</option>
						<option value="BC">Colombie-Britannique</option>
						<option value="PE">Île-du-Prince-Édouard</option>
						<option value="MB">Manitoba</option>
						<option value="NB">Nouveau-Brunswick</option>
						<option value="NS">Nouvelle-Écosse</option>
						<option value="NU">Nunavut</option>
						<option value="ON">Ontario</option>
						<option value="QC">Québec</option>
						<option value="SK">Saskatchewan</option>
						<option value="NL">Terre-Neuve et Labrador</option>
						<option value="NT">Territoire du Nord-Ouest</option>
						<option value="YT">Yukon</option>
					</select>
				</p>
				<hr class="clear">
				<p>
					<label for="champCP">Code postal</label>
					<input type="text" name="champCP" id="champCP" value="">
				</p>
				<div class="fieldset">
					<h3>Téléphone</h3>
					<p class="tripleChamp">
						<label for="champTel1">Bureau</label>
						<input type="text" name="champTelBur1" maxlength="3" id="champTelBur1" value="">
						<input type="text" name="champTelBur2" maxlength="3" id="champTelBur2" value="">
						<input type="text" name="champTelBur3" maxlength="4" id="champTelBur3" value="">
					</p>
					<p class="tripleChamp">
						<label for="champTel1">Domicile</label>
						<input type="text" name="champTelDom1" maxlength="3" id="champTelDom1" value="">
						<input type="text" name="champTelDom2" maxlength="3" id="champTelDom2" value="">
						<input type="text" name="champTelDom3" maxlength="4" id="champTelDom3" value="">
					</p>
				</div>
				<div class="fieldset">
					<h3>Courriel</h3>
					<p>
						<label for="champCourrielBur">Bureau</label>
						<input type="email" name="champCourrielBur" id="champCourrielBur" value="">
					</p>
					<p>
						<label for="champCourrielPerso">Perso</label>
						<input type="email" name="champCourrielPerso" id="champCourrielPerso" value="">
					</p>
				</div>

			</fieldset>

		</form>

		<section class="c1">

			<h3>Votre don fait une différence</h3>

		</section>

	</div><!--#content-->

</div>

<?php include('footer.php'); ?>

