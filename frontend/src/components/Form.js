import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1000px;
  min-width: 1000px;
  margin: 50px auto;
`;

const InputArea = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  grid-column: ${(props) => props.colSpan || "span 1"};
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 5px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const LargeInput = styled.textarea`
  height: 100px;
  resize: none;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 50px;
  grid-column: span 3;
  align-self: center;
  width: 100%;
  max-width: 150px;
  margin: 20px auto 0;
`;

const StatusSelect = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #bbb;
  text-align: center;
  font-size: 16px; 
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
      user.produto.value = onEdit.produto;
      user.descricao.value = onEdit.descricao;
      user.status.value = onEdit.status;
      user.tipo.value = onEdit.tipo;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = ref.current;
  
    // Validação do campo nome (somente letras)
    const nomeRegex = /^[A-Za-zÀ-ú\s]+$/;
    if (!nomeRegex.test(user.nome.value)) {
      return toast.warn("O nome deve conter apenas letras.");
    }
  
    // Validação do campo telefone (apenas números)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(user.fone.value)) {
      return toast.warn("O telefone deve conter 10 ou 11 dígitos numéricos.");
    }
  
    // Validação do campo email (formato de email válido)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email.value)) {
      return toast.warn("Insira um email válido.");
    }

    // Se todas as validações forem aprovadas, prossiga
    const userData = {
      nome: user.nome.value,
      email: user.email.value,
      fone: user.fone.value,
      data_nascimento: user.data_nascimento.value,
      produto: user.produto.value,
      descricao: user.descricao.value,
      status: user.status.value,
      tipo: user.tipo.value,
    };
  
    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.id}`, userData);
        toast.success("Usuário atualizado com sucesso");
      } else {
        await axios.post("http://localhost:8800", userData);
        toast.success("Usuário criado com sucesso");
      }
  
      // Limpar os campos do formulário
      Object.keys(userData).forEach((key) => {
        user[key].value = "";
      });
  
      setOnEdit(null);
      getUsers();
    } catch (err) {
      toast.error("Erro ao salvar os dados");
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea colSpan="span 2">
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>

      <InputArea>
        <Label>Telefone</Label>
        {/* Aplicando a máscara ao campo de telefone */}
        <InputMask mask="(99) 99999-9999" name="fone">
          {(inputProps) => <Input {...inputProps} />}
        </InputMask>
      </InputArea>

      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>

      <InputArea>
        <Label>Email</Label>
        <Input name="email" type="email" />
      </InputArea>

      <InputArea>
        <Label>Tipo</Label>
        <Input name="tipo" />
      </InputArea>

      <InputArea colSpan="span 2">
        <Label>Produto</Label>
        <Input name="produto" />
      </InputArea>

      <InputArea>
        <Label>Status</Label>
        <StatusSelect name="status">
          <option value="">Selecione</option>
          <option value="Iniciado">Iniciado</option>
          <option value="Orçado">Orçado</option>
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
        </StatusSelect>
      </InputArea>

      <InputArea colSpan="span 3">
        <Label>Descrição</Label>
        <LargeInput name="descricao" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;

