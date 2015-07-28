function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}

preloadImage("../img-rebrand/menu-sel.png");
$(document).ready(function() {
	var navItems = ["features", "docs", "support"];
	var bodyClasses = $("body").attr("class").split(" ");
	for(var i=0;i<bodyClasses.length;i++) {
		$("#navigation-link-"+bodyClasses[i]).addClass("active-nav-item");
	}
});

$("#navigation-toggle-container").on("click", function() {
	var navigationDisplay = $("#navigation").css("display");
	if (navigationDisplay === "block") {
		$("#navigation").css("display", "none");
		$("#navigation-toggle-container").removeClass("shown");

		$("#navigation").width("auto");
		$("#navigation").css('margin-left','auto');
	}
	else {
		var winWidth = window.innerWidth;
		$("#navigation").width(winWidth+"px");

		$("#navigation").css("display", "block");
		$("#navigation-toggle-container").addClass("shown");

		var leftOffset = Math.ceil($("#navigation").offset().left);
		$("#navigation").css('margin-left','-'+leftOffset+'px');
	}
});