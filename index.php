<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width= device-width, initial-scale=1.0">
	<title>ATENCIL</title>

	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.blue-amber.min.css" />
   	<link rel="stylesheet" href="css/style_dashboard.css" />
	<script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	 
</head>


<body>
	<!-- Div de montagem do layout e definições de header -->
    <div class=" mdl-layout mdl-js-layout mdl-layout--fixed-header">

        <!-- Inclui o header -->
        <?php include "includes/rwd_header.php"; ?>

        <!-- Inclui o drawer com o menu principal -->
        <?php include "includes/rwd_drawer.php"; ?>
       
        <main class="mdl-layout__content">
        
         <div id="content"> <?php include "includes/rwd_content.php"; ?> </div>
        
        </main>

       <!-- Inclui o footer -->
            <?php include "includes/rwd_footer.php"; ?> 
	</div>

</body>
</html>