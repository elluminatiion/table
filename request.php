<?php
include 'connectdb.php';
$sql = new connectdb();
$cond = '';
if ($_POST['select_filter']) {
    $result = ($_POST['select_symbol'] === 'LIKE' ? '%' . $_POST['result'] . '%' : $_POST['result']);
    $cond = $_POST['select_filter'] . ' ' . $_POST['select_symbol'] . ' "' . $result . '"';
}
$array = array();
$array['countall'] = $sql->sql_select($_GET['table_name'], 'COUNT(*)', $cond);
$limit = ($_GET['limit'] ? ' LIMIT ' . $_GET['limit'] . ',' . $_GET['rows'] : ' LIMIT 0,' . $_GET['rows']);
$array['array'] = $sql->sql_select($_GET['table_name'], '*', $cond, $limit);
echo json_encode($array);