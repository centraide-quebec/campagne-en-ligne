<?php include('header.php'); ?>

	<?php include('perso-sidebar.php'); ?>

	<div id="content">

		<hr class="clear">

		<form id="fDon" class="c5" method="get" action="">

			<fieldset class="coordonnees">

				<legend>Vos coordonnées</legend>

				<p class="doubleChamp">
					<label for="champPrenom" id="lchampPrenom">Prénom</label>
					<input type="text" name="champPrenom" id="champPrenom" value="">
					<span class="notice error"></span>
				</p>
				<p class="doubleChamp">
					<label for="champNom">Nom</label>
					<input type="text" name="champNom" id="champNom" value="">
					<span class="notice error"></span>
				</p>
				<hr class="clear">
				<p class="doubleChamp">
					<label for="champAdresse">Adresse</label>
					<input type="text" name="champAdresse" id="champAdresse" value="">
					<span class="notice error"></span>
				</p>
				
				<p class="doubleChamp">
					<label for="champVille">Ville</label>
					<input type="text" name="champVille" id="champVille" value="">
					<span class="notice error"></span>
				</p>
				<hr class="clear">
				<p>
					<label for="champProvince">Province</label>
					<select name="champProvince" id="champProvince">
						<option value="0" selected="selected">Province</option>
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
					<span class="notice error"></span>
				</p>
				<hr class="clear">
				<p>
					<label for="champCP">Code postal</label>
					<input type="text" name="champCP" id="champCP" value="">
					<span class="notice error"></span>
				</p>
				<div class="fieldset">
					<h3>Téléphone</h3>
					<p class="doubleChamp">
						<label for="champTelBur1">Bureau</label>
						<input type="tel" name="champTelBur1" maxlength="3" id="champTelBur1" value="">
						<input type="tel" name="champTelBur2" maxlength="3" id="champTelBur2" value="">
						<input type="tel" name="champTelBur3" maxlength="4" id="champTelBur3" value="">
						<span class="notice error"></span>
					</p>
					<p class="doubleChamp">
						<label for="champTelDom1">Domicile</label>
						<input type="tel" name="champTelDom1" maxlength="3" id="champTelDom1" value="">
						<input type="tel" name="champTelDom2" maxlength="3" id="champTelDom2" value="">
						<input type="tel" name="champTelDom3" maxlength="4" id="champTelDom3" value="">
						<span class="notice error"></span>
					</p>
					<hr class="clear">
				</div>
				<div class="fieldset">
					<h3>Courriel</h3>
					<p class="doubleChamp">
						<label for="champCourrielBur">Bureau</label>
						<input type="email" name="champCourrielBur" id="champCourrielBur" value="">
						<span class="notice error"></span>
					</p>
					<p class="doubleChamp">
						<label for="champCourrielPerso">Perso</label>
						<input type="email" name="champCourrielPerso" id="champCourrielPerso" value="">
						<span class="notice error"></span>
					</p>
					<p class="champCheckbox">
						<input type="checkbox" class="fl" name="champInfolettre" id="champInfolettre">
						<label class="checkbox-label" for="champInfolettre">M'abonner à l'infolettre de Centraide</label>
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

						<a class="bt-gris select" title="Don récurrent" href="#">Don récurrent</a>
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

						<p class="notice">* Un reçu sera émis par votre employeur pour un don de 10$ et plus.</p>

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

								<p class="notice">*  Votre employeur sera avisé et approuvera votre demande de déduction à la paie.</p>

								<hr class="clear">

							</div>

							<div>
								<p class="doubleChamp">
									<label for="nomDetenteur">Nom du détenteur</label>
									<input type="text" name="nomDetenteur" id="nomDetenteur" value="">
									<span class="notice error">erreur</span>
								</p>
								<p class="doubleChamp">
									<label for="numCarte">Numéro de la carte</label>
									<input type="text" name="numCarte" id="numCarte" value="">
									<span class="notice">Votre type de carte sera automatiquement détecté.</span>
									<span class="notice error">erreur</span>
								</p>
								<hr class="clear">
								<p class="doubleChamp">
									<label for="expirationM">Expiration</label>
									<input type="text" class="small-input" name="expirationM" id="expirationM" value="" size="2" maxlength="2" placeholder="MM">
									<input type="text" class="small-input" name="expirationA" id="expirationA" value="" size="4" maxlength="4" placeholder="AAAA">
									<span class="notice error">erreur</span>
								</p>
								<p class="doubleChamp">
									<label for="code">Code de vérification</label>
									<input type="text" class="small-input" name="code" id="code" value="" size="3" maxlength="3">
									<span class="notice error">erreur</span>
								</p>
								<hr class="clear">
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

<?php include('footer.php'); ?>

