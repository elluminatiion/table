<?php
include 'connectdb.php';
$sql = new connectdb();
$cond = '';
if ($_POST['select_filter']) {
    $result = ($_POST['select_symbol'] === 'LIKE'? '%' . $_POST['result'] . '%':$_POST['result']);
    $cond = $_POST['select_filter'] . ' ' . $_POST['select_symbol'] . ' "' . $result . '"';
}
echo json_encode($sql->sql_select($_GET['table_name'], '*', $cond));


