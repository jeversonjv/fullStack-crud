<?php

/**
 * @author Jeverson Gonçalves
 * @version 1.0
 * @since 03/10/2019
 */

defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");

require APPPATH . 'libraries/REST_Controller.php';

class Aluno extends REST_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	/**
	 * Método para retornar todos os alunos ou um aluno em específico.
	 * @param int $id
	 * @return response
	 */
	public function index_get($id = null)
	{
		if (!$id)
			$data = $this->Crud->select('t_aluno', "*", null, "nome ASC");
		else {
			$where["id"] = $id;
			$data = $this->Crud->select('t_aluno', "*", $where);
			if (count($data) == 0) {
				$this->response(["error" => true, "msg" => "Aluno não encontrado."], REST_Controller::HTTP_OK);
				return;
			}
		}
		if (count($data) > 0) {
			foreach ($data as $key => $value) {
				$data[$key]["foto"] = base_url() . $value["foto"];
			}
		}

		$this->response(["error" => false, "msg" => $data], REST_Controller::HTTP_OK);
	}

	/**
	 * Método para inserir um novo aluno no banco de dados e salvar sua foto no servidor.
	 * @return response
	 */
	public function inserir_post()
	{
		$nomeArquivo = md5(date("his"));
		$config['upload_path'] = 'uploads/';
		$config['allowed_types'] = 'jpg';
		$config['max_size'] = '4096';
		$config['file_name'] = $nomeArquivo;

		$this->upload->initialize($config);

		if (!$this->upload->do_upload("foto")) {
			$this->response(["error" => true, "msg" => "O único formato de imagem aceito é jpg"], REST_Controller::HTTP_OK);
		} else {
			$data["nome"] = $this->post("nome");
			$data["endereco"] = $this->post("endereco");
			$data["foto"] = "uploads/" . $nomeArquivo . ".jpg";
			if ($this->Crud->insert("t_aluno", $data)) {
				$this->response(["error" => false, "msg" => "Aluno inserido com sucesso!"], REST_Controller::HTTP_OK);
			} else {
				$this->response(["error" => true, "msg" => "Erro ao inserir, tente novamente!"], REST_Controller::HTTP_OK);
			}
		}
	}

	/**
	 * Método para atualizar os dados e/ou foto de um aluno em específico.
	 * @param int $id
	 * @return response
	 */
	public function atualizar_post($id = null)
	{
		$nomeArquivo = -1;
		$where["id"] = $id;
		if (isset($_FILES["foto"])) {
			$nomeArquivo = md5(date("his"));
			$config['upload_path'] = 'uploads/';
			$config['allowed_types'] = 'jpg';
			$config['max_size'] = '4096';
			$config['file_name'] = $nomeArquivo;
			$this->upload->initialize($config);
			$caminhoImagem = $this->Crud->select("t_aluno", "foto", $where)[0]["foto"];
			unlink($caminhoImagem);
			if (!$this->upload->do_upload("foto")) {
				$this->response(["error" => true, "msg" => "O único formato de imagem aceito é jpg"], REST_Controller::HTTP_OK);
				return;
			}
		}
		$data["nome"] = $this->post("nome");
		$data["endereco"] = $this->post("endereco");
		if ($nomeArquivo != -1)
			$data["foto"] = "uploads/" . $nomeArquivo . ".jpg";
		if ($this->Crud->update("t_aluno", $data, $where))
			$this->response(["error" => false, "msg" => "Aluno atualizado com sucesso!"], REST_Controller::HTTP_OK);
		else
			$this->response(["error" => true, "msg" => "Erro ao atualizar, tente novamente!"], REST_Controller::HTTP_OK);
	}

	/**
	 * Método para excluir os dados de um aluno e sua foto no servidor.
	 * @param int $id
	 * @return response
	 */
	public function apagar_get($id = null)
	{
		if ($id) {
			$where["id"] = $id;
			$data = $this->Crud->select("t_aluno", "*", $where);
			if (count($data) > 0) {
				$caminhoImagem = $this->path . $data[0]["foto"];
				if (file_exists($caminhoImagem)) {
					unlink($caminhoImagem);
					if ($this->Crud->delete("t_aluno", $where))
						$this->response(["error" => false, "msg" => "Aluno deletado."], REST_Controller::HTTP_OK);
					else {
						$this->response(["error" => true, "msg" => "Erro ao deletar o aluno."], REST_Controller::HTTP_OK);
						return;
					}
				} else {
					$this->response(["error" => true, "msg" => "Erro ao deletar a foto."], REST_Controller::HTTP_OK);
					return;
				}
			} else {
				$this->response(["error" => true, "msg" => "Aluno não encontrado."], REST_Controller::HTTP_OK);
				return;
			}

		} else {
			$this->response(["error" => true, "msg" => "Requisição com formato errado."], REST_Controller::HTTP_OK);
			return;
		}
	}
}
