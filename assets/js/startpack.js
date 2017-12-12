//autocentrage vertical en javascript
$(document).ready(function() {
	vert_center();
});
$(window).on("load",function() {
	vert_center();
});
function vert_center(){
	$(".vert_center").each(function(k, v) {
		var haut_par = $(v).parent().actual("height");
		var haut = $(v).actual("height");

		$(this).attr("data-haut_par",haut_par);
		$(this).attr("data-haut",haut);

		var decalage = (haut_par - haut) / 2;

		if($(this).is(".perc")){
			decalage = decalage/haut_par*100;
			$(v).css("top", decalage+"%");
		}else{
			$(v).css("top", decalage);
		}
	});
}









//egaliser la hauteur de diff?rents blocks
$(document).ready(function() {
	equalize_height_recon();
	equalize_height_do();
});
$(window).resize(function() {
	equalize_height_do();
});

var ids_to_equa = [];
function equalize_height_recon(){
	$("[data-equalize-height]").each(function(){
		if ($.inArray($(this).attr("data-equalize-height"), ids_to_equa) != -1){

		}else{
			ids_to_equa.push($(this).attr("data-equalize-height"));
		}
	});
}

function equalize_height_do(){
	ids_to_equa.forEach(function(name) {
		var temp_height = 0;
		$("[data-equalize-height="+name+"]").removeAttr("style");

		$("[data-equalize-height="+name+"]").each(function(){
			if($(this).height() > temp_height){
				temp_height = $(this).height();
			}
		});
		$("[data-equalize-height="+name+"]").height(temp_height);
	});
}










//propager un lien vers son parent/ancetre
$("body").on("click",".expend",function(e){
	if($(e.target).hasClass("link_block")){

	}else if($(e.target).parents(".link_block").length){

	}else{
		if($(this).find(".link").length > 0){
			var link = $(this).find(".link").attr("href");
		}else{
			var link = $(this).find("a").attr("href");
		}

		if($(this).find(".link").is("[target=_blank]")){
			window.open(link,'_blank');
		}else{
			window.location = link;
		}
	}
});






//systeme autopopup
$("body").on("click",".autopopup .close",function(){
	close_popup($(this).parents(".autopopup"));
});
$("body").on("click","[id^='popup_']",function(e){
	if($(e.target).is(".autopopup") || $(e.target).is(".vert_wrapper")){
		close_popup($(this));
	}
});
$("[data-popup]").click(function(){
	var id_popup = $(this).attr("data-popup");

	show_popup(id_popup);
	return false;
});
$(document).ready(function(){
	$(".autopopup.test").each(function(){
		var id_popup = $(this).attr("id");

		show_popup(id_popup);
		return false;
	});
});
function close_popup(autopopup){
	autopopup.fadeOut(function(){
		if(autopopup.find("iframe").length > 0){
			var iframe = autopopup.find("iframe");
			var video = iframe.attr("src");
			iframe.attr("src","");
			iframe.attr("src",video);
		}
	});
}
function show_popup(id){
	var popup = $("#"+id);

	if(popup.is(".generated")){
		popup.fadeIn();
	}else{
		popup.contents().wrapAll("<div class='content_wrapper'>");
		popup.contents().wrapAll("<div class='margin_wrapper'>");
		popup.contents().wrapAll("<div class='vert_wrapper'>");
		popup.contents().wrapAll("<div class='hor_wrapper'>");
		popup.contents().wrapAll("<div class='center_wrapper'>");
		popup.find(".content_wrapper").append("<span class='close cross'><i class='fa fa-times'></i></span>");

		popup.addClass("generated");

		$.event.trigger({
			type: "autopopup_created",
			id_popup: id,
		});

		popup.fadeIn();
	}
}
//idea: un syst?me d'autinjection d'iframe est trouvable dans le monjquery d'alliance





//rowing
$(document).ready(function() {
	$("rowing tr:nth-child(even) td").addClass("odd");
});







// ascenseur lift avec scroll scrollTop
// Le conteneur doit avoir une hauteur fix?e afin de ne pas bouger quand on lui retire ses enfants
function lift_shopping(){
	if($(".lift_pusher").length > 0){
		var lift_pusher = $(".lift_pusher").outerHeight();
	}else{
		var lift_pusher = 0;
	}

	if($(".content_lift").length > 0 && $(window).scrollTop() > ($(".content_lift").offset().top-lift_pusher)){
		$(".lift").addClass("fixed");
	}else{
		$(".lift").removeClass("fixed");
	}
}
$(document).ready(function() {
	lift_shopping();
});
$(window).scroll(function() {
	lift_shopping();
});







//parallax
$(document).ready(function() {
	parallax_move();
});
$(window).scroll(function() {
	parallax_move();
});
function parallax_move(){
	$(".parallax").each(function(){
		var point_0 = $(this).offset().top - $(window).height();
		if(point_0 < 0){
			point_0 = 0;
			$(this).css("background-position","50% 0%");
		}
		var point_100 = $(this).offset().top + $(this).height();

		var scrolltop_rel = $(window).scrollTop()-point_0;
		var point_100_rel = point_100-point_0;
		var scrolltop_perc = scrolltop_rel/point_100_rel*100

		if(scrolltop_perc > 0 && scrolltop_perc < 100){
			$(this).css("background-position","50% "+scrolltop_perc+"%");
		}
	});
}







// survol des icones infos
$("i.icon-info-sign").hover(
	function(){
		$("body").append('<div id="qtip_nike"></div>');
		var position = $(this).offset();
		var ctn_title = $(this).attr("data-text");
		$("#qtip_nike").html(ctn_title)
		$("#qtip_nike").prepend('<i class="icon-info-sign"></i>')

		$("#qtip_nike").css("top", position["top"] + 10);
		$("#qtip_nike").css("left", position["left"] - 230);
	},function(){
		$("#qtip_nike").remove();
	}
);








// FONCTION TAKE_THE_REST qui donne la hauteur disponible restante ? un block
$(document).ready(function () {
    take_the_rest();
});
$(window).resize(function () {
    take_the_rest();
});
$(window).on("load",function () {
    take_the_rest();
});
function take_the_rest() {
    if ($(".take_the_rest").length >= 1) {
        $(".take_the_rest").each(function (k, v) {

            var hparent = $(v).parent().height();
            var off_item = $(v).position().top;

			if($(v).is(".full")){
				$(v).height(hparent);
			}else{
				$(v).height(hparent - off_item);
			}

        });//each
    }//if
}//function take_the_rest







//FAST SCROLL TO
$("[data-fast-scroll-cmd]").click(function(){
	var id = $(this).attr("data-fast-scroll-cmd");
	var target = $("[data-fast-scroll-target="+id+"]");
	var exclusion = $("[data-fast-scroll-exclusion="+id+"]").outerHeight();
	if(exclusion){
		//test if exclusion is not null,undefined,NaN,empty string,0,false
	}else {
		exclusion = 0;
	}
	console.log(exclusion);

	var offset = target.offset();
	offset = offset.top - exclusion;
	console.log(offset);

	$('html,body').animate({scrollTop: offset}, 500);

	return false;
});










//mobile menu classique
$("#mobile_menu .navbar li>span, #mobile_menu .navbar li>a").click(function () {
    var item = $(this).closest("li");

	if(item.children(".submenu").length > 0){
		if (item.is(".open")) {
			item.removeClass("open");
		} else {
			item.addClass("open");
		}
		return false;
	}
});













//AUTOLOADER
function autoloader(cmd){
	if(cmd=="start"){
		if($("#autoloader").length == 0){
			$("body").prepend('<div id="autoloader"><i class="fa fa-spinner fa-spin"></i></div>');
		}
		$("#autoloader").fadeIn();
	}else if(cmd=="stop"){
		$("#autoloader").fadeOut();
	}
}