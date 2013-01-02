<!DOCTYPE html>
<html>
<head>
	<title>Twig Playground</title>
<script src ="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"> </script>
<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/css/bootstrap-combined.min.css" rel="stylesheet">
<style>
#variables{ 
  width: 240px; 
  height:50px;
}

#template{
  width: 640px;
  height: 160px;
}

</style>
<script>
var template = <?php echo json_encode($_GET["template"]); ?>;
var variables = <?php echo json_encode($_GET["variables"]); ?>;
</script>
<script src="twig.js"></script>
</head>
<body>
<h2>Twig Playground</h2>
</script>
<form id="twig-form">
<label for="variables">Variables JSON</label>

<div class="control-group"><textarea id="variables" name="variables"></textarea></div>
<br><br>
<label for="template">Template</label>
<div class="control-group"><textarea id="template" name="template"></textarea></div>
</form>
<pre id="display">


</pre>

<a id="permalink" href="/">Permalink</a>
</body></html>
