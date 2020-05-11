<?php
include 'connectdb.php';
$sql = new connectdb();
$filter = '';
if ($_GET['filter']) {
    $filter = ' ORDER BY ' . $_GET['filter'];
}
echo json_encode($sql->sql_select($_GET['table'], '*', '', $filter));


