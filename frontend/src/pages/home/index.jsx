import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import InputCnpjMask from "../../components/InputCnpjMask";

import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";

import { FiMapPin } from "react-icons/fi";

import { Form } from "@unform/web";
import * as Yup from "yup";
import getValidationErros from "../../utils/getValidationErros";
import api from "../../services/api";

import {
  ContainerCnpj,
  Gap,
  ContainerCard,
  Card,
  ContainerMedia,
  ErrorMessage
} from "./styles";

const Home = () => {
  const formRef = useRef(null);
  const formMediaRef = useRef(null);
  const [endereco, setEndereco] = useState({});
  const [messageError, setMessageError] = useState("");
  const [media, setMedia] = useState(-1);

  // ? (1) Mostrar o Card

  /*
  ? (1) Mostrar o Card
  ! (2) Mostrar o Erro
  * (3) Mostrar o Loading
    (0) Mostrar nada
  */
  const [showCurrentComponent, setShowCurrentCompoment] = useState(0);

  const handleCnpj = async (cnpjProps) => {
    const formatCnpjProps = cnpjProps.replace(/([^\d])+/gim, "");

    try {
      const response = await api.get(`endereco/${formatCnpjProps}`);

      if (
        response.data ===
          "CNPJ não existe, por favor digite um valor válido." ||
        response.data ===
          "CNPJ não existe, por favor verifique a quantidade de número digitados."
      ) {
        setMessageError(response.data);
        setShowCurrentCompoment(2);
        return false;
      } else {
        setEndereco(response.data);
        setShowCurrentCompoment(1);
        setMessageError("");
        return true;
      }
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };

  const handleCalcMedia = async (data) => {
    try {
      const response = await api.post("media/", data);
      setMedia(response.data.total);
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };

  const handleSubmit = async (data) => {
    setShowCurrentCompoment(3);

    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        cnpj: Yup.string().required("CNPJ Obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false, // Retorna todos os erros
      });

      handleCnpj(data.cnpj);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setShowCurrentCompoment(2);

        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
        return;
      }
    }
  };

  const handleSubmitMedia = async (data) => {
    try {
      formMediaRef.current?.setErrors({});
      const schema = Yup.object().shape({
        valorA: Yup.string().required("Valor A Obrigatório"),
        valorB: Yup.string().required("Valor B Obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false, // Retorna todos os erross
      });

      handleCalcMedia(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formMediaRef.current?.setErrors(erros);
        return;
      }
    }
  };

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <ContainerCnpj>
          <InputCnpjMask name="cnpj" type="text" label="CNPJ" />
          <Gap>
            <Button type="submit">
              <FiMapPin color="#FFFFFF" size={24} />
            </Button>
          </Gap>
        </ContainerCnpj>
      </Form>

      {showCurrentComponent === 1 && (
        <>
          <ContainerCard>
            <Card>
              <strong>Endereço</strong>
              <p>Empresa: {endereco.nome}</p>
              <p>Logradouro: {endereco.logradouro}</p>
              <p>Bairro: {endereco.bairro}</p>
              <p>Nº: {endereco.numero}</p>
              <p>UF: {endereco.uf}</p>
              <p>CEP: {endereco.cep}</p>
            </Card>
          </ContainerCard>

          <Form ref={formMediaRef} onSubmit={handleSubmitMedia}>
            <Input step="0.01" type="number" name="valorA" label="Valor A" />
            <Input step="0.01" type="number" name="valorB" label="Valor B" />
            <Button type="submit">Calcular Média</Button>
          </Form>

          {media >= 0 && (
            <ContainerMedia>
              <p>A média é: </p>
              <strong>{media}</strong>
            </ContainerMedia>
          )}
        </>
      )}

      {showCurrentComponent === 2 && <ErrorMessage>{messageError}</ErrorMessage>}
      {showCurrentComponent === 3 && <Dots color="#AC5EEA"/> }
    </>
  );
};
export default Home;
