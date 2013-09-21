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
				<img title="Evollia" src="http://placehold.it/100x100">
				<strong class="title">Evollia <a href="#">Gérer</a></strong>
				<span class="time">Division Technologies</span>
			</div>

			<div id="classement-compagnie">
				<span>Sur les entreprises inscrites, vous êtes...</span>
				<p><strong>13e</strong> dans la division <strong>Technologies</strong></p>
				<p><strong>37e</strong> au <strong>classement régional</strong></p>
			</div>

			<div id="settings">

				<a class="inbox" title="Boîte de réception" href="inbox.php">Boîte de réception <span>5</span></a>
				<a class="notes" title="Notes" href="notes.php">Notes <span>12</span></a>
				<a class="settings" title="Paramètres" href="settings.php">Paramètres</a>
				<a class="logout" title="Déconnexion" href="#">Déconnexion</a>

			</div>
			
		</section>

		<section id="dashboard">

			<a class="tableauBord" title="Tableau de bord" href="dashboard.php">Tableau de bord</a>
			<a class="rapport" title="Rapport" href="rapport.php">Rapport</a>
			<a class="inviter" title="Inviter des employés à donner" href="campagne.php">Inviter des employés à donner</a>

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

		<section class="c3">

			<section class="oh badges">

				<h2>Classement</h2>

				<h3>Mes badges</h3>

				<span class="badge acquis">Badge</span>
				<span class="badge acquis">Badge</span>
				<span class="badge acquis">Badge</span>
				<span class="badge acquis">Badge</span>
				<span class="badge acquis">Badge</span>
				<span class="badge">Badge</span>
				<span class="badge">Badge</span>
				<span class="badge">Badge</span>

			</section>

			<div id="tabs" class="classement">

				<ul class="resp-tabs-list">
					<li>Meilleurs donateurs</li>
				</ul>

				<div class="table resp-tabs-container">

					<div>

						<ol class="content">

							<li>
								<div class="c4 entreprise vignette">
									<span class="index"><strong>1</strong></span>
									<img src="http://placehold.it/50x50">
									<strong class="title">Frédéric Bolduc</strong>
									<span class="time">Evollia</span>
								</div>
								<div class="c2 don-moyen">
									<strong>68 $</strong>
								</div>
								<hr class="clear">
							</li>

							<li>
								<div class="c4 entreprise vignette">
									<span class="index"><strong>2</strong></span>
									<img src="http://placehold.it/50x50">
									<strong class="title">Frédéric Bolduc</strong>
									<span class="time">Evollia</span>
								</div>
								<div class="c2 don-moyen">
									<strong>68 $</strong>
								</div>
								<hr class="clear">
							</li>

							<li>
								<div class="c4 entreprise vignette">
									<span class="index"><strong>3</strong></span>
									<img src="http://placehold.it/50x50">
									<strong class="title">Frédéric Bolduc</strong>
									<span class="time">Evollia</span>
								</div>
								<div class="c2 don-moyen">
									<strong>68 $</strong>
								</div>
								<hr class="clear">
							</li>
				
						</ol>

					</div>

				</div>

				<a href="classement.php" class="bt-rose">Voir le classement complet</a>

			</div>

		</section>

		<section class="c3">

			<h2>Dernière activité</h2>

			<ul class="news vignette">
				<li>
					<img src="http://placehold.it/50x50">
					<span class="title"><strong>Frédéric Bolduc</strong> a donné 10$</span>
					<span class="time">Il y a 1 jours</span>
				</li>
				<li>
					<img src="http://placehold.it/50x50">
					<span class="title"><strong>Frédéric Bolduc</strong> a donné 10$</span>
					<span class="time">Il y a 1 jours</span>
				</li>
				<li>
					<img src="http://placehold.it/50x50">
					<span class="title"><strong>Frédéric Bolduc</strong> a donné 10$</span>
					<span class="time">Il y a 1 jours</span>
				</li>
				<li>
					<img src="http://placehold.it/50x50">
					<span class="title"><strong>Frédéric Bolduc</strong> a donné 10$</span>
					<span class="time">Il y a 1 jours</span>
				</li>
			</ul>

		</section>

	</div>

</div>

<?php include('../footer.php'); ?>

