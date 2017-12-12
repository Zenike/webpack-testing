//fonction permettant de rafraichir les calculs du
//formulaire dans un cas de création en ajax
function formflex_refresh(){
	$.event.trigger({
		type: "formflex_refresh",
		input: "",
	});
}







//checkbox et radio personnalisé
$(document).ready(function () {
    checkbox_checking();
});
$(document).on("formflex_refresh", function(options){
	checkbox_checking();
});
$("body").on("change",".ffx-checkskin input",function () {
    checkbox_checking();
});
$("body").on("mousedown",".ffx-checkskin",function () {
    if ($(this).find("input").prop('disabled') == false) {
        $(this).addClass("ffx-checkskin--mousedown");
    }
})
$("body").on("mouseup",function () {
    $(".ffx-checkskin").removeClass("ffx-checkskin--mousedown");
});
function checkbox_checking() {
    $(".ffx-checkskin input").each(function () {
        if ($(this).is(":checked")) {
			var checkskin =  $(this).parents(".ffx-checkskin");
            checkskin.addClass("ffx-checkskin--checked");

			//condition spéciale dans le cas d'une "star"
			if(checkskin.is(".ffx-checkskin--icon") && checkskin.parent().is("fieldset")){
				checkskin.prevAll().addClass("ffx-checkskin--checked");
			}
        } else {
            $(this).parents(".ffx-checkskin").removeClass("ffx-checkskin--checked");
        }
    });
}//checkbox_checking

//bloquer les clicks sur les labels en eux mêmes (et pas sur le texte ou l'input)
/*
$("body").on("click",".formflex label",function(e){
   if(e.target == this){
       return false;
   }
});
*/
//infobulle qui n'enclenche pas le label
/*
$("body").on("mousedown", ".tips_hover", function(event){
	event.stopPropagation();
	return false;
});
$("body").on("click",".tips_hover",function(event){
	if($(this).is(".mobile_active")){
		$(this).removeClass("mobile_active");
	}else{
		$(this).addClass("mobile_active");
	}

	event.stopPropagation();
	return false;
});
*/













//équilibrer les tailles de names dans les formulaires (alignement)
$(document).ready(function () {
    align_names();
});
$(document).on("formflex_refresh", function(options){
	align_names();
});
function align_names() {
    $(".formflex").each(function (k, v) {
        var max_width = 0;
		var type_of_names = ">label .ffx-name:first-child, .relay>label .ffx-name:first-child, fieldset legend, .ffx-name.forced_align";

        $(v).find(type_of_names).not(".no_size").each(function () {
			$(this).removeAttr("style");

			if($(this).next().is(".clear")){
				$(this).addClass("no_size");
			}else if ($(this).actual('width') >= max_width) {
                max_width = $(this).actual('width');
            }
        });

        $(v).find(type_of_names).not(".no_size").width(max_width + 10);
    });
};









//ajuster la largeur des champs éléments ffx-righting-box
$(document).ready(function () {
    to_the_right();
});//ready
$(document).on("formflex_refresh", function(options){
	to_the_right();
});
function to_the_right() {
    $(".ffx-righting-box").each(function (k, v) {
		var name = $(this).parent().find(".ffx-name");
		var name_width = name.width() + 3;

		$(this).css("left",name_width);
    });
};





















//équilibrer les tailles dees radio/checkboxs dans un fieldset trop long
/*
$(document).ready(function () {
    equalize_fieldset();
});
$(document).on("formflex_refresh", function(options){
	equalize_fieldset();
});
function equalize_fieldset() {
    $(".equalize").each(function (k, v) {
        var max_width = 0;

        $(v).find("label .name").each(function () {
			if ($(this).actual('width') >= max_width) {
                max_width = $(this).actual('width');
            }
        });

		$(v).find("label .name").width(max_width+1);
		//le +1 est une sécurité car parfois les navigateurs bug un peu
		//et quand j'applique la taille actuelle ça passe en deux lignes.
		//testable sur firebug en jouant avec la largeur dynamiquement.
    });
};
*/








/*
$(document).ready(function(){
	isolating_legend_solo();
});
$(window).resize(function(){
	isolating_legend_solo();
});
function isolating_legend_solo(){
	$(".formflex legend.solo").each(function(k,v){
		$(this).height("auto");
		$(this).height($(this).parent().height());
	});
};
*/















//form radio auto menu
$(document).ready(function () {
    radio_auto_menu();
});
$(document).on("formflex_refresh", function(options){
	radio_auto_menu();
});
$('body').on('change', "[data-radio-auto-menu] input", function () {
    if ($(this).is(":checked")) {
        radio_auto_menu_target($(this).parents("[data-radio-auto-menu]"));
    }
});
function radio_auto_menu() {
    $("[data-radio-auto-menu] input").each(function () {
		var prechecked = $(this).parents("fieldset").find("input:checked").length;

		if (prechecked==1) {
			if ($(this).is(":checked")) {
				radio_auto_menu_target($(this).parents("[data-radio-auto-menu]"));
			}
		}else{
			if($(this).parents("fieldset").find(".uncheck_default").length==1){
				radio_auto_menu_target($(this).parents("fieldset").find(".uncheck_default"));
			}
		}
    });
};
function radio_auto_menu_target(v) {
    var target = $(v).attr("data-radio-auto-menu");
    var no_targets = new Array();

    $(v).parents("fieldset").find("[data-radio-auto-menu]").each(function () {
        no_targets.push($(this).attr("data-radio-auto-menu"));
    });

    //cacher les lignes qui contiennent un mot clé
    for (i = 0; i < no_targets.length; i++) {
		//met en tableau les items qui contiennent cet attribut
		var item_notargets =  $("[data-target~=" + no_targets[i] + "]");


		item_notargets.each(function(){
			$(this).hide();
			$(this).not(".no_disabled").find("input,select,textarea").attr("disabled","disabled");
			$(this).filter(".empty_input").find("input,select,textarea").val("");
		});
    }

    //afficher grace au mot clé du radio checked
	var item_target =  $("[data-target~=" + target + "]");
	$(item_target).show();
	$(item_target).find("input,select,textarea").removeAttr("disabled");
}//radio_auto_menu_target











//form checkbox auto menu
$(document).ready(function () {
    checkbox_auto_menu();
});
$(document).on("formflex_refresh", function(options){
	checkbox_auto_menu();
});
$('body').on('change', "[data-checkbox-auto-menu] input", function () {
	if ($(this).is(":checked")) {
		checkbox_auto_menu_target($(this).parents("[data-checkbox-auto-menu]"),"-yes");
	}else{
		checkbox_auto_menu_target($(this).parents("[data-checkbox-auto-menu]"),"-no");
	}
});

function checkbox_auto_menu() {
    $("[data-checkbox-auto-menu] input").each(function () {
		if ($(this).is(":checked")) {
			checkbox_auto_menu_target($(this).parents("[data-checkbox-auto-menu]"),"-yes");
		}else{
			checkbox_auto_menu_target($(this).parents("[data-checkbox-auto-menu]"),"-no");
		}
    });
};

function checkbox_auto_menu_target(v,state) {
    var target = $(v).attr("data-checkbox-auto-menu");

	$("[data-target=" + target + "-yes]").hide();
	$("[data-target=" + target + "-no]").hide();
	if($(v).is(".checkbox-disabled")){
	$("[data-target=" + target + "-yes]").find("input, textarea, select").attr("disabled","disabled");
	$("[data-target=" + target + "-no]").find("input, textarea, select").attr("disabled","disabled");
	}

	$("[data-target=" + target + state + "]").show();
	if($(v).is(".checkbox-disabled")){
	$("[data-target=" + target + state + "]").find("input, textarea, select").removeAttr("disabled");
	}
}//checkbox_auto_menu_target











//form select auto menu
$(document).ready(function () {
    select_auto_menu();
});
$(document).on("formflex_refresh", function(options){
	select_auto_menu();
});
$('body').on('change', "[data-ffx-select-automenu]", function () {
	select_auto_menu_target($(this),$(this).find("option:checked"));
});
function select_auto_menu() {
    $("[data-ffx-select-automenu]").each(function () {
		select_auto_menu_target($(this),$(this).find("option:checked"));
    });
};
function select_auto_menu_target(v,w) {
    var target = $(v).attr("data-ffx-select-automenu")+"-"+$(w).attr("data-key");
    var no_targets = new Array();
    $(v).find("option").each(function () {
        no_targets.push($(v).attr("data-ffx-select-automenu")+"-"+$(this).attr("data-key"));
    });

    //cacher les lignes qui contiennent un mot clé
    for (i = 0; i < no_targets.length; i++) {
		//met en tableau les items qui contiennent cet attribut
		var item_notargets =  $("[data-ffx-select-target~=" + no_targets[i] + "]");

		item_notargets.each(function(){
			$(this).hide();
			$(this).not(".no_disabled").find("input,select,textarea").attr("disabled","disabled");
			$(this).filter(".empty_input").find("input,select,textarea").val("");
		});
    }

    //afficher grace au mot clé du radio checked
	var item_target =  $("[data-ffx-select-target~=" + target + "]");
	$(item_target).show();
	$(item_target).find("input,select,textarea").removeAttr("disabled");
}//select_auto_menu_target





















//form lang menu
// lancer la fonction langue globale qui parcourt TOUT
$(document).ready(function () {
    lang_menu();
});
$(document).on("formflex_refresh", function(options){
	lang_menu();
});
// au clic, lancer la fonction lang avec en param la langue du bouton
$('body').on('click', "[data-lang-menu] [data-lang]", function () {
	lang_menu_target($(this));
});
// fonction globale qui lance tous les menus au chargement
function lang_menu() {
    $("[data-lang-menu] [data-lang]").each(function () {
		//trouver le bouton de langue enfoncé apr defaut (si y en a un)
		var preselected = $(this).parents("[data-lang-menu]").find("[data-lang].selected").length;

		//si y en a un, lancer la fonction avec cette valeur, sinon lancer avec le premier bouton
		if (preselected==1) {
			if ($(this).is(".selected")) {
				lang_menu_target($(this));
			}
		}else{
			var first_button = $(this).parents("[data-lang-menu]").find("[data-lang]:first");
			lang_menu_target(first_button);
		}
    });
};
//fonction generale (l'attribut est l'ID de la langue)
function lang_menu_target(v) {
	//stocker l'identifiant de ce menu
	var target_general = $(v).parents("[data-lang-menu]").attr("data-lang-menu");
	//stocker la langue (sous forme de numero souvent)
	var target_extension = $(v).attr("data-lang");
	//créer l'id des éléments à matcher en combinant l'id et la langue à afficher
    var target = target_general+"-"+target_extension;

	//gerer le menu en lui meme (selected etc)
	$(v).parents("[data-lang-menu]").find("[data-lang]").removeClass("selected");
	$(v).addClass("selected");

	//cacher tous les éléments liés à cet ID langue
	$("[data-lang-category=" + target_general + "]").hide();

    //afficher grace au mot clé de l'onglet sélectionné
	$("[data-lang-target~=" + target + "]").show();
}//form lang menu







//Menu de traduction en autopopup
//OUVERTURE ET RECUPERATION
$('body').on('click', "[data-lang-target] input[type=text],[data-lang-target] textarea", function () {
	var id_lang_verif = $(this).parents("[data-lang-category]").attr("data-lang-category");
	if($("[data-lang-menu="+id_lang_verif+"]").is(".mode_popup")){
		if($(this).is("[readonly]")){

		}else{
			if($("[data-lang-menu="+id_lang_verif+"]>li").length>1){
				lang_auto_popup($(this));
			}
		}
	}
});
var unique_input_id_cpt=0;
function lang_auto_popup(input){
	//VARIABLES ET STOCKAGE
	//Nom du regroupement (sans l'extension de la langue)
	var id_lang = input.parents("[data-lang-target]").attr("data-lang-category");
	//Le texte de l'input clické, dans la langue cliquée
	var label_text = input.closest("label").find(".ffx-name").text();
	//stocker l'index de l'input par rapport à son parent (afin de trouver ses équivalents plus tard)
	var index_input = input.closest("[data-lang-target]").find("input,textarea").index(input);
	//stockage des inputs équivalents
	var array_input_multilang = [];
	input.parents("[data-lang-category]").parent().find("[data-lang-category="+id_lang+"]").each(function(){
		var sibling_element = $(this).find("input,textarea").eq(index_input);
		sibling_element.attr("data-unique-input-id",unique_input_id_cpt);
		unique_input_id_cpt++;
		array_input_multilang.push(sibling_element);
	});
	//tableau avec les noms abrégés des langues
	var lang_name = [];
	$("[data-lang-menu="+id_lang+"] li").each(function(){
		lang_name.push($(this).html());
	});



	$("#popup_lang_zoom").remove();
	$("body").append('<div id="popup_lang_zoom" class="autopopup new m15 w500">');
	$("#popup_lang_zoom").append('<div class="popup_title">'+label_text+'</div>');
	$("#popup_lang_zoom").append('<div class="form">');
	var cpt=0;
	$(array_input_multilang).each(function(){
		$("#popup_lang_zoom .formflex").append("<label>");
		$("#popup_lang_zoom .formflex label:last").append('<span class="ffx-name">'+lang_name[cpt]+'</span>');
		cpt++;

		var clone = $(this).clone();
		//réppliquer la valeur au clone à cuase d'un bug sur les textareas
		clone.val($(this).val());

		$("#popup_lang_zoom .formflex label:last").append(clone);
		$("#popup_lang_zoom .formflex label:last").append('<span class="clear"></span>');
	});
	$("#popup_lang_zoom").append('<div class="popup_buttons"><div class="left"><span class="popup_cancel close">Annuler</span></div><div class="right"><span class="popup_validate">Valider</span></div></div>');

	align_names();

	var active_input = $("#popup_lang_zoom input[type=text]:first, #popup_lang_zoom textarea:first");
	show_popup("popup_lang_zoom");

	active_input.focus();
}

//FERMETURE ET RESTITUTION
$('body').on('click', ".popup_validate", function () {
	var inputs_array = $(this).parents(".content_wrapper").find(".formflex").find("input,textarea");

	inputs_array.each(function(){
		var unique_id = $(this).attr("data-unique-input-id");
		$(this).removeAttr("data-unique-input-id");

		$(this).insertAfter($("[data-unique-input-id="+unique_id+"]"));
		$("[data-unique-input-id="+unique_id+"]").remove();
	});

	$(this).parents("#popup_lang_zoom").fadeOut();
});
















// SAVING INPUT NAME
//sauvegarder la valeur d'une checkbox non-cliquée en créant dynamiquement un input hidden
$(document).ready(function () {
    $("input[data-uncheck-safe]").each(function () {
        uncheck_safe($(this));
    });
});
$(document).on("formflex_refresh", function(options){
    $("input[data-uncheck-safe]").each(function () {
        uncheck_safe($(this));
    });
});
$("body").on("change","input[data-uncheck-safe]",function () {
    uncheck_safe($(this));
});

function uncheck_safe(v) {
	if($(v).is("[data-name-safe]")){
		$(v).attr("name",$(v).attr("data-name-safe"));
		$(v).removeAttr("data-name-safe");
	}

    var name = $(v).attr("name");

    var name_wo_special = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    $(v).parents('label').next("input.uncheck-safe[name='" + name_wo_special + "']").remove();

    if ($(v).is(":checked")) {

    } else {
        $('<input class="uncheck-safe" type="hidden" name="' + name + '" value="0">').insertAfter($(v).parents("label"));

		$(v).attr("data-name-safe",name);
		$(v).removeAttr("name");
    }
}















$(document).ready(function () {
	position_each_customErrorValidation();
});
$(document).on("formflex_refresh", function(options){
	position_each_customErrorValidation();
});
function position_each_customErrorValidation(){
	$(".customErrorValidation").each(function(){

		if($(this).parents(".label,label").length==1){
			var conteneur = $(this).parents(".label,label");
		}else{
			var conteneur = $(this).parents(".lane, fieldset");
		}



		//si plusieurs input dans le même parent, on se base sur le name pour les associer
		/*
		if(conteneur.find("input").length == 1){
			var input = conteneur.find("input");
		}else{
			var message_name = $(this).attr("data-name");
			var input = conteneur.find('input[name="'+message_name+'"]');
		}
		*/
		var input = conteneur.find("input, select, textarea");

		if(input.length > 0){
			var deca_left = input.offset().left - conteneur.offset().left;
			var deca_top = input.offset().top-21 - conteneur.offset().top;

			$(this).css({
			left: deca_left+"px",
			top: deca_top+"px",
			});
		}
	});
}










function empty_the_inputs(inputs_parent){
	$(inputs_parent).find('input[type="text"],input[type="password"],textarea').val("");
	$(inputs_parent).find("input, textarea").removeAttr('checked');
	$(inputs_parent).find(".checked").removeClass('checked');
	$(inputs_parent).find(".children_wrapper").remove();
	$(inputs_parent).find("input, textarea, select").removeAttr('readonly');
}





function do_sortable(){
	$(".sortable").sortable({
		handle: ".move",
		update:function(event,ui){callback_form_add($(this))},
		stop:function(event,ui){
			if(ui.item.parent().is(".children_wrapper")){
				var group = ui.item.parent().children(".category")
				organize_sortable_position(group);
			}else{
				var group = ui.item.attr("data-group");
				organize_sortable_position($("[data-group=" + group + "]"));
			}
		}
	});
};









function insert_from_exterior(v){
	//definir le template à duppliquer
	var template_name = $(v).attr("data-child-template-cmd");
	var template = $("[data-child-template=" + template_name + "]");

	//definir les elements references (premier et dernier element appartenant au même groupe)
	var group_target = $(v).attr("data-group-target");
	var last_group_target = $("[data-group="+group_target+"]:last");
	var original = $("[data-group="+group_target+"]:first");

	//definir l'element, c'est à dire le groupe créé et ajouté
	var element = template.clone(true).removeAttr("data-child-template").attr("data-group",group_target).addClass("clone");

	//insérer l'élément à la fin de la liste
	element.insertAfter(last_group_target);

	//en cas d'incrementation des names en manuel (optionnel)
	if(last_group_target.is(".manual_increment")){
		input_names_auto(element,original,group_target,last_group_target);
	};

	//REMISE EN PLACE DES ELEMENTS DE LANGUE
	//recuperation de la catégorie de langue
	original_category = original.find("[data-lang-iso]").attr("data-lang-category");
	//ajout en attribut au nouveau element de : categorie, target complet recomposé
	element.find("[data-lang-iso]").each(function(){
		$(this).attr("data-lang-category",original_category);
		$(this).attr("data-lang-target",original_category+"-"+$(this).attr("data-lang-iso"));
	});

	lang_menu();

	if(element.is(".auto_child_on_inclusion")){
		element.find(".children_add:visible").trigger("click");
	}
}//insert_from_exterior





















//fonction de test utile pour afficher les names des inputs dans la page
function test_names(test){
	setTimeout(function myFunction() {
		$("input[type=text]").each(function(){
			$(this).val($(this).attr("name"));
		});
	}, 500)
}








//systeme de renommage automatique des names quand menu d'ajout/suppression formflex
function input_names_auto(element,original,group,last){
	//element: l'élément cloné, à insérer, qui n'existe pas encore dans le DOM, juste en variable
	//original: est le premier élément utilisant le nom de groupe ciblé
	//group: l'id unique du groupe ciblé, n'est pas récuperé de la même façon en fonction du type de clonage/insertion
	//last: dernier élément portant l'id du groupe en cours (contraire de original)

	//le nouvel element est forcément en manuel lui aussi (non nécessaire si clonage depuis un élément adjacent, mais nécessaire depuis une inclusion externe)
	element.addClass("manual_increment");

	//GESTION DU COMPTEUR
	//récuperer le cpt de groupe (ou le créer si il n'existe pas) et le tenir à jour
	if(original.is("[data-group-cpt]")){
		var recup_current_cpt = original.attr("data-group-cpt");
		var new_item_cpt = recup_current_cpt;
		new_item_cpt++;
	}else{
		var prev_brother_cpt = element.prevAll("[data-group=" + group + "]").length;
		var new_item_cpt = prev_brother_cpt;
	}

	//réappliquer les valeurs de cpt aux éléments
	$("[data-group=" + group + "]").attr("data-group-cpt",new_item_cpt);
	element.attr("data-this-cpt",new_item_cpt);


	//RECREATION DU NAME
	//recuperer la structure basique
	var structure_width_new_level = last.find("[data-form-base]").first().addBack().attr("data-form-base");
	//console.log("data-form-base : "+structure_width_new_level);
	//réappliquer à l'élément nouvellement créé
	element.find("[data-lang-iso]").attr("data-form-base",structure_width_new_level);

	var base_structure_and_id = structure_width_new_level+"["+new_item_cpt+"]";
	//console.log("data-form-base + cpt d'item : "+base_structure_and_id);

	if(element.find("[data-lang-iso]").length >= 1){
		element.find("[data-form-base]").each(function(){
			var lang_iso = $(this).attr("data-lang-iso");

			$(this).find("[data-name]").each(function(){
				var actual_input_name = $(this).attr("data-name");

				//inner-child est un mode spécial où l'ordre des éléments du nouveau name est différent et un mot est inséré en plus
				if($(this).is("[data-inner_child]")){
					var inner_child_data = $(this).attr("data-inner_child");
					var inner_child_structure = base_structure_and_id+"["+inner_child_data+"]"+"["+lang_iso+"]"+"[0]["+actual_input_name+"]";
					//console.log("inner child structure : "+inner_child_structure);

					$(this).attr("name",inner_child_structure);
				}else{
					var base_id_name_lang = base_structure_and_id+"["+actual_input_name+"]"+"["+lang_iso+"]";
					//console.log("base + id + name + lang : "+base_id_name_lang);

					$(this).attr("name",base_id_name_lang);
				}
			});
		});
	}else{
		element.find("[data-form-base]").addBack().each(function(){
			if($(this).find("[data-name]").length >= 1){
				$(this).find("[data-name]").each(function(){
					var actual_input_name = $(this).attr("data-name");
					var base_id_name = base_structure_and_id+"["+actual_input_name+"]";

					$(this).attr("name",base_id_name);
					//console.log("base + id + name : "+base_id_name_lang);
				});
			}else{
				$(this).find("input, textarea, select").each(function(){
					$(this).attr("name",base_structure_and_id)

					//console.log("base sans ajouts : "+base_id_name_lang);
				});
			}
		});
	}
}



































//ajouter un enfant (via templates séparés)
function insert_child(v){
	var template_name = $(v).attr("data-child-template-cmd");
	var template = $("[data-child-template=" + template_name + "]");

	//si le div "children_wrapper" rassemblant les enfants de l'élémen
	//est inexistant, le créer, avec ou sans déclarer la fonction de tri (jquery ui sortable)

	if($(v).closest(".category").find(".children_wrapper").length<1){
		if($(v).parents(".sortable").length>=1){
			$(v).closest(".category").append('<div class="sortable children_wrapper">');
			do_sortable();
		}else{
			$(v).closest(".category").append('<div class="children_wrapper">');
		}
	}

	//trouver le groupe d'enfant relatif à cet élément
	var children_wrapper = $(v).closest(".category").find(".children_wrapper:first");
	//trouver l'élément faisant office de parent au niveau de la logique de la structure
	var parent = $(v).closest(".category");
	//cloner le template adéquat et le mettre en variable, prêt pour la suite
	var element = $(template).clone(true).removeAttr("data-child-template");

	//insérer l'élément dans le groupe d'enfants
	children_wrapper.append(element);

	//aller au parent logique et prendre, dans un attribut préparé, la mise en forme de la structure créee jusque là
	/*
	$(parent).find("[data-form-base]").each(function(){
		console.log( $(this).attr("data-form-base") );
	});
	*/

	var ancestor_name_structure = $(v).closest("[data-form-base]").attr("data-form-base");

	//récuperation du compteur d'enfants
	//si il n'est aps encore définit, se baser sur le nombre de frères existants
	//sinon, récuperer le cpt sur l'attribut du groupe d'enfant, l'incrementer et l'écraser.
	if(children_wrapper.is("[data-child-cpt]")){
		var recup_current_cpt = children_wrapper.attr("data-child-cpt");
		var new_item_cpt = recup_current_cpt;
		new_item_cpt++;
	}else{
		var prev_brother_cpt = element.prevAll(".category").length;
		var new_item_cpt = prev_brother_cpt;
	}
	children_wrapper.attr("data-child-cpt",new_item_cpt);

	//stocker l'id de langue pour l'insérer dans les enfants créés
	var langue_id = parent.find("[data-lang-category]").attr("data-lang-category");
	//remplacer l'attribut de selection de langue avec l'id du nouveau parent
	element.find("[data-lang-iso]").each(function(){
		var lang_iso = $(this).attr("data-lang-iso");
		var parent_cpt = $(this).closest("[data-this-cpt]").attr("data-this-cpt");

		$(this).attr("data-lang-target",langue_id+"-"+lang_iso)
		$(this).attr("data-lang-category",langue_id)

		//créer la base du nouveau name en assemblant les pièces récuperées (il manque le nom du champs)
		//puis stocker cette valeur au niveau actuel afin qu'elle soit dispo pour les sous niveaux suivants.
		var structure_width_new_level = ancestor_name_structure+"["+parent_cpt+"][children]["+lang_iso+"]["+new_item_cpt+"]";

		$(this).find("input, textarea").attr("data-structure",structure_width_new_level);
	});

	element.find("[data-name]").each(function(){
		$(this).attr("name",$(this).attr("data-structure")+"["+$(this).attr("data-name")+"]")
	});

	//rafraichir le menu des langues (masquer les non selectionnées)
	lang_menu();
	organize_sortable_position(parent.find(".category"));



	$.event.trigger({
		type: "child_added",
		new_item: element,
	});
}//insert-child

//cloner ou suprrimer un elemennt de formulaire
function clone_form_element(v){
	//récuperer l'identifiant de groupe
	//définir l'élément original à duppliquer
	var group = $(v).attr("data-group");
	var original = $("[data-group=" + group + "]").first();
	var last = $("[data-group=" + group + "]").last();
	var element = $(original).clone(true).addClass("clone");

	$.event.trigger({
	type: "form_element_before_cloned",
	original: original,
	});

	empty_the_inputs(element);

	$(element).insertAfter(last);

	initialize_form_add_remove_buttons(v);

	//en cas d'incrementation des names en manuel (optionnel)
	if($(element).is(".manual_increment")){
		input_names_auto(element,original,group,last);
	};
	organize_sortable_position($("[data-group=" + group + "]"));

	$.event.trigger({
	type: "form_element_cloned",
	element: element,
	original: original,
	});
}//clone_form_element

function organize_sortable_position(targets){
	var cpt = 0;
	var depth = 0;

	targets.each(function(){
		var this_target = $(this).find(".sortable_get_position:first");

		this_target.val(cpt);
		cpt++;
	});
}

function delete_form_element(v){
	var stock_parent = v.parent();
	v.remove();

	initialize_form_add_remove_buttons(v);

	organize_sortable_position(stock_parent.children(".category"));

	$.event.trigger({
		type: "element_deleted",
		new_item: v,
	});
}
//fonction lancée par jquery ui en cas de tri
function callback_form_add(v){
	initialize_form_add_remove_buttons(v.find("[data-group]"));
}
function initialize_form_add_remove_buttons(v){
	var group = v.attr("data-group");
	var last = $("[data-group=" + group + "]").last();
	$("[data-group=" + group + "]").removeClass("dupplicate_wrapper");
	last.addClass("dupplicate_wrapper");
}//initialize_form_add_remove_buttons



$(document).ready(function(){
	$(".formflex [data-group]").each(function(){
		initialize_form_add_remove_buttons($(this));
	});
	if($(".sortable").length>=1){
		do_sortable();
	}
});
$(document).on("formflex_refresh", function(options){
	$(".formflex [data-group]").each(function(){
		initialize_form_add_remove_buttons($(this));
	});
	if($(".sortable").length>=1){
		do_sortable();
	}
});




$("body").on("click", ".formflex .dupplicate", function (e) {
    e.preventDefault();
    clone_form_element($(this).closest("[data-group]"));
    return false;
});
$("body").on("click", ".formflex .children_add", function (e) {
    e.preventDefault();
    insert_child($(this));
    return false;
});
$("body").on("click", ".formflex .exterior_add", function (e) {
    e.preventDefault();
    insert_from_exterior($(this));
    return false;
});
$("body").on("click", ".formflex .delete", function(){
	if($(this).parents(".category").length > 0){
		delete_form_element($(this).closest(".category"));
	}else{
		delete_form_element($(this).closest("[data-group]"));
	}
    return false;
});


















/* TRASH

$(element).find("[name]").each(function(){
	var name = $(this).attr("name");
	name = name.replace("[0]","["+cpt+"]");

	$(this).attr("name",name);
});

$(element).find("[data-target]").each(function(){
	var name = $(this).attr("data-target");
	name = name.replace("_0_","_"+cpt+"_");

	$(this).attr("data-target",name);
});







var cpt = $(original).attr("data-manual-increment");
cpt++;
$(original).attr("data-manual-increment",cpt);

$(element).find("[name]").each(function(){
	var name = $(this).attr("name");
	name = name.replace("[0]","["+cpt+"]");

	$(this).attr("name",name);
});
$(element).find("[data-target]").each(function(){
	var name = $(this).attr("data-target");
	name = name.replace("_0_","_"+cpt+"_");

	$(this).attr("data-target",name);
});

*/