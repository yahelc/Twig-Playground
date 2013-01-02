<?php
require('Twig/lib/Twig/Autoloader.php');
Twig_Autoloader::register();


$loader = new Twig_Loader_String();
$twig = new Twig_Environment($loader);
$template = $twig->loadTemplate($_POST["template"]);
echo $template->render(json_decode($_POST["variables"], true));
?>
