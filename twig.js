function error(causeOfError) {
	$("#display").css("color", "red");
	if (causeOfError) {
		$("#" + causeOfError).closest(".control-group").addClass("error");
	}
}



function success(d) {
	if (d && d === "json") {
		$("#variables").closest(".control-group").removeClass("error");
		return;
	}
	$("#display").html(d).css("color", "black");
	$(".control-group").removeClass("error");
}
$(function() {

	$("#twig-form").bind("keyup keypress pageload", function(e) {
		var variables = $("#variables").val() || "{}";
		var template = $("#template").val();
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
			if ("sessionStorage" in window) {
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

	$(function() {
		if (template && variables) {
			$("#template").val(template);
			$("#variables").val(variables);
		} else {
			if ("sessionStorage" in window) {
				for (var key in sessionStorage) {
					if (sessionStorage.hasOwnProperty(key)) {
						$("#" + key).val(sessionStorage[key]);
					}
				}
			}
		}
		$("#twig-form").trigger("pageload");
	});

});
