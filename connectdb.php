<?php

class connectdb
{
    protected $db, $login, $password, $sql, $dbname;

    function __construct()
    {
        global $config;
        $this->login = $config['login'];
        $this->password = $config['password'];
        $this->host = $config['host'];
        $this->dbname = $config['dbname'];
        try {
            $this->sql = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->dbname . ';',
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