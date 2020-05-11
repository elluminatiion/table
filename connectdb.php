<?php


class connectdb
{
    protected $db, $login, $password, $sql, $dbname;

    function __construct()
    {
        $this->login = 'root';
        $this->password = 'root';
        $this->db = 'localhost';
        $this->dbname = 'table_table';
        try {
            $this->sql = new PDO('mysql:host=' . $this->db . ';dbname=' . $this->dbname . ';',
                $this->login, $this->password);
        } catch (PDOException $e) {
            print "Error:" . $e->getMessage();
            die();
        }
    }

    function sql_select($table, $fields, $cond = null, $limit = null)
    {
        $res = "SELECT " . $fields . " FROM " . $table . ($cond ? " WHERE " . $cond : '') . $limit;
        $row = $this->sql->prepare($res);
        $row->execute();
        return $row->fetchAll();
    }

}