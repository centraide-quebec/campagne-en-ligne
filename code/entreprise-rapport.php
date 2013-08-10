<?php include('header.php'); ?>

	<?php include('entreprise-sidebar.php'); ?>

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

<?php include('footer.php'); ?>

