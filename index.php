<?php

$handle = fopen("templates/home.html", "r");  /*Open body content*/

$content = fread($handle,filesize("templates/home.html")); /*$content var contains the web-page body content*/
fclose ($handle);

$active_home = "active"; /*Highlight active nav buttons*/

include "template.php";  /*template.php contains all content that will not change*/
