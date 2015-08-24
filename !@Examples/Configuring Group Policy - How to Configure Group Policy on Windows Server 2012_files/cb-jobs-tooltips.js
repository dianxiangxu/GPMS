var $j = jQuery;
$j(document).ready(function() {
	$j(".job_company a").tooltip(
		{ position: "center right", offset: [10, 15], delay: 150}
	);
	$j(".job_location a").tooltip(
		{ position: "center right", offset: [10, 15], delay: 150}
	);
});