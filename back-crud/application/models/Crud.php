<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Crud extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}

	public function select($table = null, $field = "*", $where = null, $order = null)
	{
		$this->db->select($field);
		if ($where) {
			$this->db->where($where);
		}
		if ($order) {
			$this->db->order_by($order);
		}
		$result = $this->db->get($table);
		return $result->result_array();
	}

	public function insert($table, $dados)
	{
		return $this->db->insert($table, $dados);
	}

	public function update($table, $dados, $where)
	{
		$this->db->where($where);
		return $this->db->update($table, $dados);
	}

	public function delete($table, $where)
	{
		$this->db->where($where);
		return $this->db->delete($table);
	}

}

?>
