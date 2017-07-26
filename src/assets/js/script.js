// console.log("script.js");
$(document).ready(function(){
	if($('.dashboard').length>0){
		$('body').addClass('dashboard');
	}
});


function mobileMenu(){

	// console.log("mobileMenu");

	var mobileMenu = $("#mobileMenu"),
		menuTop = mobileMenu.css("top"),
		height = "-" + window.innerHeight + "px";

	// console.log(menuTop);
	// console.log(height);

	mobileMenu.css("display", "block");

	if (menuTop == "-100%" || menuTop == height) {

		mobileMenu.animate({
			top: "0%"
		}, 500);

	} else if (menuTop == "0px") {

		mobileMenu.animate({
			top: "-100%"
		}, 500);

	}

}
