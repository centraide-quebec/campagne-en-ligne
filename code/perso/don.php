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
			
			<a class="bt-rose select don" href="don.php" title="Faire un don">Faire un don</a>

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

		<img alt="Bannière d'Evollia" class="entreprise-banner" src="http://placehold.it/830x246">
		<div class="vignette">
			<img alt="Evollia" src="http://placehold.it/180x180">
		</div>

	</header>

	<div id="content">

		<hr class="clear">

		<form id="fDon" class="c5">
			<fieldset class="coordonnees">

				<legend>Vos coordonnées</legend>

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
					<input type="text" name="champAdresse" id="champAdresse" value="">
				</p>
				<hr class="clear">
				<p>
					<label for="champVille">Ville</label>
					<input type="text" name="champVille" id="champVille" value="">
				</p>
				<hr class="clear">
				<p>
					<label for="champProvince">Province</label>
					<select name="champProvince" id="champProvince">
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
					<p class="doubleChamp">
						<label for="champTelBur1">Bureau</label>
						<input type="tel" name="champTelBur1" maxlength="3" id="champTelBur1" value="">
						<input type="tel" name="champTelBur2" maxlength="3" id="champTelBur2" value="">
						<input type="tel" name="champTelBur3" maxlength="4" id="champTelBur3" value="">
					</p>
					<p class="doubleChamp">
						<label for="champTelDom1">Domicile</label>
						<input type="tel" name="champTelDom1" maxlength="3" id="champTelDom1" value="">
						<input type="tel" name="champTelDom2" maxlength="3" id="champTelDom2" value="">
						<input type="tel" name="champTelDom3" maxlength="4" id="champTelDom3" value="">
					</p>
					<hr class="clear">
				</div>
				<div class="fieldset">
					<h3>Courriel</h3>
					<p class="doubleChamp">
						<label for="champCourrielBur">Bureau</label>
						<input type="email" name="champCourrielBur" id="champCourrielBur" value="">
					</p>
					<p class="doubleChamp">
						<label for="champCourrielPerso">Perso</label>
						<input type="email" name="champCourrielPerso" id="champCourrielPerso" value="">
					</p>
					<p>
						<label class="long-label" for="champInfolettre">M'abonner à l'infolettre de Centraide</label>
						<input type="checkbox" class="fl" name="champInfolettre" id="champInfolettre">
					</p>
					<p>
						<label for="champPreferenceCourriel">Votre préférence</label>
						<select name="champPreferenceCourriel" id="champPreferenceCourriel">
							<option value="1" selected="selected">fbolduc@evollia.com</option>
							<option value="2">frederic.bolduc@gmail.com</option>
						</select>
					</p>
					<p>
						<input type="submit" id="envoyer" name="envoyer" value="envoyer">
					</p>
					<hr class="clear">
				</div>

			</fieldset>

			<fieldset>

				<legend>Je désire faire un...</legend>

				<section>

					<div class="choice">

						<a class="bt-gris" title="Don récurrent" href="#">Don récurrent</a>
						<a class="bt-gris" title="Don unique" href="#">Don unique</a>

					</div>

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
						<hr class="clear">

						<ul class="resp-tabs-list">
							<li>Déduction à la paie *</li>
							<li>Carte de crédit</li>
							<li>Prélèvement bancaire</li>
						</ul>

						<div class="resp-tabs-container wrapper">

							<div>

								<div class="division">

									<p class="nombre-paie">Nombre de paie par année <strong>24 paies (aux 15 jours)</strong></p>

									<select class="confidentialite">
										<option value="0">Paramètre de confidentialité</option>
										<option value="1">Rester anonyme</option>
										<option value="2">Afficher mon nom seulement</option>
										<option value="3">Afficher mon nom et le montant ($) de mon don</option>
									</select>
								</div>

								<p class="nombre-paie">*  Votre employeur sera avisé et approuvera votre demande de déduction à la paie.</p>

								<hr class="clear">

							</div>

							<div>
							</div>

							<div>
							</div>

						</div>

					</div>

				</section>

			</fieldset>

			<fieldset class="recapitulatif">

				<legend>Vérification de vos renseignements</legend>

				<section>
					<h3>Votre don</h3>
					<p>Votre don est de 240$</p>
					<p>Déduction à la paie</p>
				</section>

				<section>
					<h3>Mode de paiement</h3>
					<p>Visa 6019 **** **** *518</p>
					<p>Exp. 03/2014</p>
				</section>

			</fieldset>

		</form>

		<section class="c1 impact-don">

			<h3>Votre don fait une différence</h3>

			<section>

				<div class="perso">
					<span class="enfant"></span>
					<span class="enfant"></span>
					<span class="enfant"></span>
					<span class="enfant"></span>
					<span class="enfant"></span>
					<span class="enfant"></span>
					<span class="enfant"></span>
					<span class="enfant"></span>
				</div>
				<p>
					<strong>8 enfants</strong> auront un manteau, une tuque et des bottes cet hiver. <span>Merci !</span>
				</p>

			</section>

			<section>

				<div class="perso">
					<span class="enfant"></span>
					<span class="adulte"></span>
					<span class="adulte"></span>
					<span class="enfant"></span>
					<span class="enfant"></span>
					<span class="adulte"></span>
					<span class="adulte"></span>
					<span class="enfant"></span>
				</div>
				<p>
					<strong>2 familles</strong> dans le besoin recevront des biens non périssables pendant un mois. <span>Merci !</span>
				</p>

			</section>

			<h3>Votre classement</h3>

			<section>

				<p>
					Grâce à ce don, vous passerez au rang de <strong>Grand donateur</strong>. <span>Merci !</span>
				</p>

			</section>

			<section>

				<p>
					Grâce à ce don, vous passerez au <strong>3e rang au sein de votre entreprise</strong>. <span>Merci !</span>
				</p>

			</section>

		</section>

	</div><!--#content-->

</div>

<?php include('../footer.php'); ?>

