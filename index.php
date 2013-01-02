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
<script src="twig.js">

</head>
<body>
<h2>Twig Playground</h2>
</script>
<form id="twig-form">
<label for="variables">Variables JSON</label>

<textarea id="variables" name="variables"></textarea>
<br><br>
<label for="template">Template</label>
<textarea id="template" name="template"></textarea>
</form>
<pre id="display">


</pre>

<a id="permalink" href="/">Permalink</a>
</body></html>
