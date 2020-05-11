<?php
include 'connectdb.php';
$sql = new connectdb();
$cond = '';
if ($_POST) { print_r($_POST);
    $filter = ' ORDER BY ' . $_GET['filter'];
}
echo json_encode($sql->sql_select($_GET['table'], '*', $cond));


