import React, { useState } from "react";
import axios from "axios";

import { IoIosAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";

import loadingGif from "../../image/loading.gif";

import "./styles.css";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export default function Adicionar() {
  const baseUrl = "http://localhost/back-crud/";
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [foto, setFoto] = useState("");
  const [loading, setLoading] = useState(false);

  async function salvar(e) {
    e.preventDefault();
    const extensaoImagem = foto.name.split(".")[1];
    if (extensaoImagem !== "jpg") {
      toast.error("Ops...O único formato de imagem aceito é jpg", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.set("nome", nome);
      formData.set("endereco", endereco);
      formData.append("foto", foto);
      try {
        const response = await axios.post(
          `${baseUrl}/api/aluno/inserir`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success(`${response.data.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      } catch (e) {
        toast.error(`Ops...ocorreu um erro, tente novamante!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
      resetForm();
    }

    setLoading(false);
  }

  function resetForm() {
    document.getElementById("formAluno").reset();
    setNome("");
    setEndereco("");
    setFoto("");
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h5 className="titulo-add"> Adicionar um aluno </h5>
          <hr />
          <Form id="formAluno" onSubmit={e => salvar(e)}>
            <FormGroup row>
              <Label for="nome" sm={2}>
                Nome:
              </Label>
              <Col sm={12}>
                <Input
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Digite o nome"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                  maxLength="80"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="endereco" sm={2}>
                Endereço:
              </Label>
              <Col sm={12}>
                <Input
                  type="text"
                  name="endereco"
                  id="endereco"
                  placeholder="Digite o endereço"
                  value={endereco}
                  onChange={e => setEndereco(e.target.value)}
                  required
                  maxLength="255"
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="foto">Adicionar uma foto</Label>
              <Input
                type="file"
                name="file"
                id="foto"
                onChange={e => setFoto(e.target.files[0])}
                required
              />
            </FormGroup>
            <FormGroup>
              {!loading ? (
                <Button color="success" type="submit">
                  <IoIosAddCircleOutline /> Salvar
                </Button>
              ) : (
                <Button color="success" disabled>
                  <img src={loadingGif} width="35" height="35" alt="Loading" />
                </Button>
              )}
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
