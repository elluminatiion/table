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
            $this->sql = new PDO('mysql:host=' . $this->db . ';dbname=table_table;', $this->login, $this->password);
        } catch (PDOException $e) {
            print "Error:" . $e->getMessage();
            die();
        }
    }

    function sql_select($table, $fields, $cond = null)
    {
        $res = "SELECT " . $fields . " FROM " . $table . ($cond ? " WHERE " . $cond : '');
        $row = $this->sql->prepare($res);
        $row->execute();
        return $row->fetchAll();
    }

}