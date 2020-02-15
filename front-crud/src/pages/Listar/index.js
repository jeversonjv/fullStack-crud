import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.css";
import { IoIosTrash, IoIosBuild } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

export default function Listar() {
  const baseUrl = "http://localhost/back-crud/";
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function fetchAlunos() {
      const response = await axios.get(`${baseUrl}/api/aluno`);
      setAlunos(response.data.msg);
    }
    fetchAlunos();
  }, []);

  function confimarExcluir(id) {
    Swal.fire({
      title: "Tem certeza?",
      text: "Não será possível restaurar.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, pode deletar!"
    }).then(result => {
      if (result.value) {
        Swal.fire("Deletado!", "O aluno foi deletado!", "success");
        excluir(id);
      }
    });
  }

  async function excluir(id) {
    const response = await axios.get(`${baseUrl}/api/aluno/apagar/${id}`);
    if (response.status <= 200) {
      setAlunos(alunos.filter(aluno => aluno.id !== id));
    } else {
      toast.error(`Ops...${response.data.msg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  }

  function editar(id) {
    window.location.href = `/editar/${id}`;
  }

  return (
    <Container className="container">
      <Row>
        {alunos.length === 0 ? (
          <Col md="12" xs="12">
            <h6>
              Nenhum aluno cadastrado.
              <a href="/add"> Clique aqui para adicionar. </a>
            </h6>
          </Col>
        ) : (
          alunos.map(aluno => {
            return (
              <Col sm="3" xs="12" key={aluno.id}>
                <Card className="my-card">
                  <CardImg
                    top
                    width="100%"
                    src={aluno.foto}
                    alt="Card image cap"
                    height="220px"
                  />
                  <CardBody>
                    <CardTitle>
                      <strong>Nome:</strong>
                    </CardTitle>
                    <CardSubtitle>{aluno.nome}</CardSubtitle>
                    <CardTitle>
                      <strong>Endereço:</strong>
                    </CardTitle>
                    <CardText>{aluno.endereco}</CardText>
                    <Button
                      onClick={() => confimarExcluir(aluno.id)}
                      className="del-btn"
                      color="danger"
                    >
                      <IoIosTrash /> Excluir
                    </Button>
                    <Button onClick={() => editar(aluno.id)} color="primary">
                      <IoIosBuild /> Editar
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
      <ToastContainer />
    </Container>
  );
}
