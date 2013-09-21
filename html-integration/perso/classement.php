<?php include('../header.php'); ?>

	<aside id="sidebar">

		<section class="wrapper en-tete-aside">

			<header>

				<img width="90" alt="Logo de Centraide Québec et Chaudière-Appalache" src="/images/logo-centraide.png">
				<h1>Votre campagne en ligne</h1>

			</header>

		</section>

		<section class="wrapper admin">

			<div class="vignette profil">
				<img alt="Evollia" src="http://placehold.it/100x100">
				<strong class="title">Frédéric Bolduc</strong>
				<span class="time">Evollia</span>
			</div>

			<div id="settings">

				<a class="badge" title="Classement" href="index.php">Classement</a>
				<a class="privacy" title="Paramètre de confidentialité" href="confidentialite.php">Paramètre de confidentialité</a>
				<a class="logout" title="Déconnexion" href="#">Déconnexion</a>

			</div>
			
			<a class="bt-rose don" href="don.php" title="Faire un don">Faire un don</a>

		</section>

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
				<div id="votre-contribution" class="donnees">
					<h3>Votre contribution</h3>
					<p>147,00 $</p>
				</div>

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

		<section class="pagination c6">

			<h2>Classement</h2>

			<div id="tabs" class="classement">

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
									<img alt="Frédéric Bolduc" src="http://placehold.it/50x50">
									<strong class="title">Frédéric Bolduc</strong>
								</div>
								<div class="c1 don-moyen">
									<strong>68 $</strong>
								</div>
								<div class="c1 totale">
									<strong>4321 $</strong>
								</div>
								<div class="c1 suivie">
									<span><a href="#" class="bt-suivie">Suivre</a></span>
								</div>
								<hr class="clear">
							</li>

							<li>
								<div class="c3 entreprise vignette">
									<span class="index"><strong>1</strong></span>
									<img alt="Frédéric Bolduc" src="http://placehold.it/50x50">
									<strong class="title">Frédéric Bolduc</strong>
								</div>
								<div class="c1 don-moyen">
									<strong>68 $</strong>
								</div>
								<div class="c1 totale">
									<strong>4321 $</strong>
								</div>
								<div class="c1 suivie">
									<span><a href="#" class="bt-suivie select">Suivre</a></span>
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
									<img alt="Frédéric Bolduc" src="http://placehold.it/50x50">
									<strong class="title">Frédéric Bolduc</strong>
								</div>
								<div class="c1 don-moyen">
									<strong>68 $</strong>
								</div>
								<div class="c1 totale">
									<strong>4321 $</strong>
								</div>
								<div class="c1 suivie">
									<span><a href="#" class="bt-suivie">Suivre</a></span>
								</div>
								<hr class="clear">
							</li>

							<li>
								<div class="c3 entreprise vignette">
									<span class="index"><strong>1</strong></span>
									<img alt="Frédéric Bolduc" src="http://placehold.it/50x50">
									<strong class="title">Frédéric Bolduc</strong>
								</div>
								<div class="c1 don-moyen">
									<strong>68 $</strong>
								</div>
								<div class="c1 totale">
									<strong>4321 $</strong>
								</div>
								<div class="c1 suivie">
									<span><a href="#" class="bt-suivie select">Suivre</a></span>
								</div>
								<hr class="clear">
							</li>

						</ol>

					</div>

				</div>

			</div>

			<div class="page_navigation"></div>

		</section>

	</div>

</div>

<?php include('../footer.php'); ?>

