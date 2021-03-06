function error(causeOfError) {
	$("#display").css("color", "red");
	if (causeOfError) {
		$("#" + causeOfError).closest(".control-group").addClass("error");
	}
}

var supportsSessionStorage = "sessionStorage" in window; 

function success(d) {
	if (d === "json") {
		$("#variables").closest(".control-group").removeClass("error");
		return;
	}
	$("#display").css("color", "black");
	$(".control-group").removeClass("error");
}

var get = (function() {
	var map = {};
	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, k, v) {
		map[k] = decodeURIComponent(v.replace(/\+/g," "));
	});
	return map;
} ());

var template = get.template;
var variables = get.variables; 

$(function() {

	var $template  = $("#template"),
		$variables = $("#variables");

	$("#twig-form").bind("keyup keypress pageload", function(e) {
		var variables = $("#variables").val() || "{}";
		var template = $template.val();
		if (!window.isFirst) {
			window.isFirst = true;
			if (variables === sessionStorage.variables && template === sessionStorage.template) {
				return true;
			}
		}
		if (e.target.id == "variables") {
			try {
				JSON.parse(variables);
			}
			catch(eee) {
				error("variables");
				return true;
			}
			success("json");
		}
		if (e.target.id == "template") {
			if (template.split("{").length !== template.split("}").length) {
				error("template");
				return true;
			}
		}
		$.post("render.php", {
			'template': template,
			'variables': variables
		},
		function(d) {
			success();
			$("#display").html(d);
			if (supportsSessionStorage) {
				sessionStorage.setItem("variables", variables);
				sessionStorage.setItem("template", template);
			}
			$("#permalink").attr("href", function() {
				return "/?" + $("#twig-form").serialize();
			});
			if ("replaceState" in window.history) {
				history.replaceState({},
				document.title, $("#permalink").attr("href"));
			}
		}).error(error);

	});
	if (template && variables) {
		$template.val(template);
		$variables.val(variables);
	} else if (supportsSessionStorage) {
		$template.val(sessionStorage.getItem("template"));
		$variables.val(sessionStorage.getItem("variables"));
	}
	$("#twig-form").trigger("pageload");

});
