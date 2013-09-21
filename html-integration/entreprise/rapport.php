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
			<a class="rapport select" title="Rapport" href="rapport.php">Rapport</a>
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

		<h2 class="c6">Rapport</h2>

		<section class="c2">

			<h3>Extraire les donateurs</h3>

			<form class="mini-form" id="extraireDonateur">

				<p>
					<label for="champFormat">Format</label>
					<select name="champFormat" id="champFormat">
						<option>CSV</option>
						<option>DOC</option>
						<option>Une option plus longue</option>
					</select>
				</p>
				<p>
					<label for="champFiltre">Filtrer</label>
					<select name="champFiltre" id="champFiltre">
						<option>Tous</option>
						<option>DOC</option>
					</select>
				</p>
				<p>
					<label for="champDate">À partir de</label>
					<input type="text" id="datepicker" />
				</p>
				<p>
					<input class="bt-rouge" type="submit" value="Extraire">
				</p>

			</form>

		</section>

	</div>

</div>

<?php include('../footer.php'); ?>

