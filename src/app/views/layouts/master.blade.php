<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<title>Centraide - Campagne en ligne</title>
		<link href='http://fonts.googleapis.com/css?family=Enriqueta:400,700|Asap:400,700|Shadows+Into+Light' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="assets/stylesheets/style.css" />
		<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<!--[if lt IE 9]>
			<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->

		<!--[if lte IE 8]>
			<script type="text/javascript" src="assets/js/roundies.js"></script>
			<link rel="stylesheet" type="text/css" href="/ie.css" />
			<script type="text/javascript" src="assets/js/lte-ie-8.js"></script>
		<![endif]-->

	</head>
	<body>
		<div id="page" class="container">

				<aside id="sidebar">
					@section('sidebar')
						<section class="wrapper en-tete-aside">

							<header>

								<img width="90" alt="Logo de Centraide Québec et Chaudière-Appalache" src="assets/images/logo-centraide.png">
								<h1>Votre campagne en ligne</h1>

							</header>

							<a class="bt-rose don" target="_blank" href="https://www.centraide-quebec.com/dons" title="Faire un don">Faire un don</a>

						</section> <!-- .en-tete-aside -->

						<section class="wrapper admin">

							<h2>Connectez-vous</h2>

							<form method='get' accept-charset='UTF-8' name='oi_form' action='#' class="fConnection">
								<label for="email" class="visuallyhidden">Courriel</label>
								<input type='email' name='email' placeholder="Votre courriel" />
								<input class="bt-rose fr" type='submit' value="Connexion" />
							</form>

							<a class="fbconnect" href="#" title="Me connecter via Facebook">Me connecter via Facebook</a>
							<a class="gmailconnect" href="#" title="Me connecter via Gmail">Me connecter via Gmail</a>

						</section> <!-- .admin -->

						<section class="wrapper progression">

							<h2>Progression de la campagne</h2>

							<div id="thermo">

								<div id="avancement">
									<div id="jauge"></div>
								</div>
								<div id="objectif" class="donnees">
									<h3>Objectif de la campagne</h3>
									<p>75 000 $</p>
								</div>
								<div id="contribution-totale" class="donnees">
									<h3>Contribution totale</h3>
									<p>9 483,03 $</p>
								</div>

							</div>

						</section> <!-- .progression -->
					@show
				</aside>

				<div id="content">
					@yield('content')
				</div> <!-- #content -->
			</div>

			<hr class="clear">
			<div id="footer">

				<div class="container">

					<section class="c2 logo">

						<div class="wrapper aligncenter">

							<a href="http://www.centraide-quebec.com/" target="_blank" title="Centraide Québec"><img alt="Logo de Centraide Québec et Chaudière-Appalache" src="assets/images/logo-centraide.png"></a>

						</div>

					</section>

					<div class="oh lien-footer">

						<section class="c2 menu-footer">

							<div class="wrapper">

								<h3>Centraide</h3>

								<ul>
									<li><a href="#" title="Campagne Centraide">Campagne Centraide</a></li>
									<li><a href="#" title="À propos">À propos</a></li>
								</ul>

								<a class="bt-rose" href="#" title="Faire un don">Faire un don</a>

							</div>

						</section>

						<section class="c2 newsletter">

							<div class="wrapper">

								<h3>Restez informé</h3>

								<form method='get' accept-charset='UTF-8' name='oi_form' class="fConnection" action='http://suivi.lnk01.com/oi/1/313ec887ff3c03ff28d05a203e8eaec1'>
									<label for="email" class="visuallyhidden">Courriel</label>
									<input type='email' name='email' id="email" placeholder="Votre courriel" />
									<input type='hidden' name='goto' value='' />
									<input type='hidden' name='iehack' value='&#9760;' />
									<input class="bt-rose fr" type='submit' value="S'inscrire" />
								</form>

								<div class="rs">
									<a class="fb" title="Facebook" href="#">Facebook</a>
									<a class="yt" title="Youtube" href="#">Youtube</a>
									<a class="gp" title="Youtube" href="#">Youtube</a>
									<a class="tw" title="Youtube" href="#">Youtube</a>
								</div>

							</div>

						</section>

						<section class="c2">

							<div class="wrapper">

								<h3>Développeurs</h3>

								<a href="#" title="Contribuer à cette application">Contribuer à cette application</a>

							</div>

						</section>

					</div>

				</div>

			</div> <!-- #footer -->
		</div> <!-- #page.container -->

		<script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>
		<script type="text/javascript" src="assets/js/jquery.paginate.min.js"></script>
		<script type="text/javascript" src='assets/js/jquery.selectbox.min.js'></script>
		<script type="text/javascript" src="assets/js/jquery.easyResponsiveTabs.min.js"></script>
		<script type="text/javascript" src="assets/js/formToWizard.js"></script>
		<script type="text/javascript" src="assets/js/jquery.mockjax.js"></script>
		<script type="text/javascript" src="assets/js/jquery.validate.js"></script>
		<script type="text/javascript" src="assets/js/dist/jquery.jqplot.min.js"></script>
		<script type="text/javascript" src="assets/js/dist/excanvas.js"></script>
		<script type="text/javascript" src="assets/js/dist/plugins/jqplot.pointLabels.min.js"></script>
		<script type="text/javascript" src="assets/js/script.js"></script>
	</body>
</html>