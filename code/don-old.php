<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<title>Mon site</title>
	<link href='http://fonts.googleapis.com/css?family=Enriqueta:400,700|Asap:400,700' rel='stylesheet' type='text/css'>
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

		<section class="c5">

			<h2>Je désire faire un...</h2>

			<div id="wrapper-slider" class="c4">
				<div id="montant"></div>
				<div id="priceBox"></div>
			</div>

			<div class="c2">

				uaj

			</div>

			<hr class="clear">

			<div id="tabs">

				<ul class="resp-tabs-list">
					<li>Déduction à la paie</li>
					<li>Carte de crédit</li>
					<li>Prélèvement bancaire</li>
				</ul>

				<div class="resp-tabs-container wrapper">

					<div>
						
						

					</div>
					<div>

						<form action="" id="fDonCredit" class="oh">

							<p>
								<label for="nomDetenteur">Nom du détenteur</label>
								<input type="text" name="nomDetenteur" id="nomDetenteur" value="">
							</p>
							<p>
								<label for="numCarte">Numéro de la carte</label>
								<input type="text" name="numCarte" id="numCarte" value="">
								<span class="notice">Votre type de carte sera automatiquement détecté.</span>
							</p>
							<p>
								<label for="expirationM">Expiration</label>
								<input type="text" class="small-input" name="expirationM" id="expirationM" value="" size="2" maxlength="2" placeholder="MM">
								<input type="text" class="small-input" name="expirationA" id="expirationA" value="" size="4" maxlength="4" placeholder="AAAA">
							</p>
							<hr class="clear">
							<p>
								<label for="code">Code de vérification</label>
								<input type="text" class="small-input" name="code" id="code" value="" size="3" maxlength="3">
							</p>
							<hr class="clear">
							<p>
								<input class="bt-rose fr" type="submit" name="etapeSuivante" id="etapeSuivante" value="Passer à l'étape suivante">
							</p>

						</form>

					</div>
					<div>

							fd

					</div>

				</div>

			</div>

		</section>

		<section class="c1">

			<h2>Dernière activité</h2>

			

		</section>

	</div>

</div>

<?php include('footer.php'); ?>

