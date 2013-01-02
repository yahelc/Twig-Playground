function error(){
	$("pre").css("color","red");
}
$(function(){
	
$("form").bind("keyup keypress pageload", function(e){
  var variables = $("#variables").val() || "{}";
  var template = $("#template").val();
  if(!window.isFirst){
	  window.isFirst = true;
	  if(variables === sessionStorage.variables && template === sessionStorage.template){
		return true;
	}
  }
  if(e.target.id =="variables"){
    try{
        JSON.parse(variables);
    }
    catch(eee){
      error();
	  return true;
    }
  }
  if(e.target.id =="template") {
    if(template.split("{").length !== template.split("}").length) {
      error();
      return true;
     }
  }
  $.post("render.php", {'template':template , 'variables' : variables } , 
    function(d){
	  $("pre").html(d).css("color","black");
	  if("sessionStorage" in window){
			sessionStorage.setItem("variables", variables);
			sessionStorage.setItem("template", template);
		}
		$("#permalink").attr("href", function(){
			return "/?" + $("form").serialize();
		});
		if("replaceState" in window.history){
			history.replaceState({}, document.title, $("#permalink").attr("href"));
		}
    }).error(error);

});

$(function(){
 if(template && variables){
	$("#template").val(template);
	$("#variables").val(variables);
}
else{
	if("sessionStorage" in window){
		for(var key in sessionStorage){
			if(sessionStorage.hasOwnProperty(key)){
				$("#"+key).val(sessionStorage[key]);
			}
		}
	}
}
$("form").trigger("pageload");
});


});
