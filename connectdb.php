<?php


class connectdb
{
    protected $db, $login, $password, $sql;

    function __construct()
    {
        $this->login = 'root';
        $this->password = 'root';
        $this->db = 'localhost';
        try {
            $this->sql = new PDO('mysql:host=' . $this->db . ';dbname=beejee;', $this->login, $this->password);
        } catch (PDOException $e) {
            print "Error:" . $e->getMessage();
            die();
        }
    }

    function sql_insert($table, $array)
    {
        $keys = array_keys($array);
        $array = $this->array_parse($array, '');
        $array2 = $this->array_parse($keys, '', '?');
        $array2 = implode(',', $array2);
        $keys = implode(',', $keys);
        $res = "INSERT INTO `" . $table . "` (" . $keys . ") ";
        $res .= " VALUES (" . $array2 . ")";
        $this->sql->prepare($res)->execute($array);
    }

    function sql_delete($table, $cond = null)
    {
        $res = "DELETE FROM " . $table . ($cond ? " WHERE " . $cond : '');
        return $this->sql->exec($res);
    }

    function sql_select($table, $fields, $cond = null, $filter = null)
    {
        $res = "SELECT " . $fields . " FROM " . $table . ($cond ? " WHERE " . $cond : '') . $filter;
        $row = $this->sql->prepare($res);
        $row->execute();
        return $row->fetchAll();
    }

    function sql_update($table, $array, $cond = null)
    {
        $array_keys = array_keys($array);
        $array_keys = implode('=?, ', $array_keys) . "=?";
        $res = "UPDATE " . $table . " SET " . $array_keys . ($cond ? " WHERE " . $cond : '');
        $res = $this->sql->prepare($res);
        $array = $this->array_parse($array,'');
        return $res->execute($array);
    }
    function array_parse($array,$opt, $replace = null) {
        $new_array = array();
        foreach ($array as $row){
            if ($replace){
                $row = $replace;
            } else {
                $row = $opt . $row . $opt;
            }
            array_push($new_array, $row);
        }
        return $new_array;
    }
}