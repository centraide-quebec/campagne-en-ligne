<?php include('header.php'); ?>

	<?php include('entreprise-sidebar.php'); ?>

	<div id="content">

		<hr class="clear">

		<h2 class="c6">Nouvelle campagne</h2>

		<?php /* ?>

		<section class="c6" id="wizard">

			<div class="shadow">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<div>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>

		</section>

		<?php */ ?>

		<section class="c6" id="wizard">

			<div>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>

		</section>

		<section class="c4">

			<h3>Écrire un message</h3>

			<p>Ici CKEDITOR</p>

		</section>

		<section class="c2">

			<form class="mini-form" id="publierCampagne">

				<p>
					<label for="champSatut">Satut</label>
					<select name="champSatut" id="champSatut">
						<option>Brouillon</option>
						<option>Publié</option>
						<option>Planifié</option>
					</select>
				</p>
				<p>
					<label for="champVisibilite">Visibilité</label>
					<select name="champVisibilite" id="champVisibilite">
						<option>Publique</option>
						<option>Privée</option>
					</select>
				</p>
				<p>
					<label for="champDateCreation">Création</label>
					<input type="text" name="champDateCreation" id="datepicker" />
				</p>
				<p>
					<input class="bt-rouge" type="submit" value="Publier la campagne">
				</p>

			</form>
			

		</section>

	</div>

</div>

<?php include('footer.php'); ?>

