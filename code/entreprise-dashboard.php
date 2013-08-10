<?php include('header.php'); ?>
<script>
jQuery(document).ready(function(){

	jQuery(window).resize(function(){
		plot1.replot({resetAxes: false});
	})

	var line1 = [[0, 1, null], [3, 50.00, '50,00 $'], [8, 57.58, '57,58 $'], [12, 412.35, '412,35 $'], [15, 112.34, '112,34 $'], [22, 156.89, '156,89 $'], [25, 200.00, '200,00 $']];
	var plot1 = $.jqplot('chart1', [line1], {
		animate: true,
		animateReplot: true,
		title: {
			text: 'Chart with Point Labels',
			show: false
		},
		seriesDefaults: { 
			showMarker:false,
			pointLabels: { show: true },
			highlighter: { show: true }
		},
		series: [{
			lineWidth: 4,
			shadow: false,
			color: "#f00",
			showMarker: true,
			markerOptions: {
				shadow: false,
				style: 'filledCircle',
				color: '#f00'
			},
			rendererOptions: {
				animation: {
					speed: 3000
				}
			}
		}],
		grid: {
			backgroundColor: '#222222',
			shadow: false,
			drawBorder: false,
			drawGridlines: true,
			gridLineColor: '#2b2b2b',
			gridLineWidth: 1
		},
		axesDefaults: {
			tickOptions: {
				textColor: '#fff',
				show: true,
				showMark: false,
				showAxis: false,
				showGridline: true,
				autoscale: false
			},
			rendererOptions: {
				drawBaseline: false
			}
		},
		axes: {
			xaxis: {
			    tickOptions: {
			       	showGridline: false
				},
				min: 1,
				max: 31,
				tickInterval: 1
			},
			yaxis: {
				tickOptions: {
					showLabel: false,
					showGridline: true
				},
				min: 0,
				max: 500
			}
		}
	});
});
</script>

	<?php include('entreprise-sidebar.php'); ?>

	<div id="content">

		<hr class="clear">

		<section class="c6">

			<h2>Satistiques</h2>

			<div id="time-switcher">
				<a href="#" class="select" title="Voir les jours">Jour</a>
				<a href="#" title="Voir les mois">Mois</a>
				<a href="#" title="Voir les années">Année</a>
			</div>

			<hr class="clear">

			<div id="jqplot-wrapper">

				<div id="month-switcher">

					<a href="#" title="Mois précédent" class="prev fl">Précédent</a>
					<div>
						<span>Mai</span>
						<span>Juin</span>
						<span>Juillet</span>
						<span>Août</span>
					</div>
					<a href="#" title="Mois suivant" class="next fr">Suivant</a>

				</div>

				<div class="jqplot-target" id="chart1" style="position: relative;"></div>

			</div>
			

		</section>

	</div>

</div>



<?php include('footer.php'); ?>

