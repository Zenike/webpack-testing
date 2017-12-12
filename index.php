<?php $pathLinkFile="./assets/"; ?>
<!doctype html>
<html lang="fr">
<head>
	<title>Nom de la page</title>
	<meta name="description" content="Description courte de la page" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="fr" />
	<meta http-equiv="Content-Script-Type" content="text/javascript" />
	<link href="<?php echo $pathLinkFile; ?>css/style.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo $pathLinkFile; ?>css/font-awesome.min.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo $pathLinkFile; ?>img/favicon.png" rel="shortcut icon" type="image/png" />
</head>

<body>

<h1>
	Hellooooo
</h1>

<ul>
	<?php for($i=1;$i<=10;$i++){ ?>
	<li>
		<img src="<?php echo $pathLinkFile; ?>img/examples/<?php echo $i; ?>.jpg">
	</li>
	<?php } ?>
</ul>

<script type="text/javascript" src="<?php echo $pathLinkFile; ?>js-output/bundle-vendors.js"></script>
<script type="text/javascript" src="<?php echo $pathLinkFile; ?>js-output/bundle-progra.js"></script>
<script type="text/javascript" src="<?php echo $pathLinkFile; ?>js-output/bundle-integrator.js"></script>
</body>
</html>
