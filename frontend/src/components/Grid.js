import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const TableWrapper = styled.div`
  padding: 10px;
  display: block;
  background-color: #f9f9f9;
  overflow-x: auto;
  max-width: 100%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;



const Thead = styled.thead`
  background-color: #f2f2f2;
`;

const Th = styled.th`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;

  &:nth-child(1) {
    width: 25%;
  }
  &:nth-child(2) {
    width: 20%;
  }
  &:nth-child(3) {
    width: 30%;
  }
  &:nth-child(4) {
    width: 15%;
  }
  &:nth-child(5) {
    width: 10%;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 

  /* Responsividade */
  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }

  svg {
    cursor: pointer;
    margin: 0 5px;
    color: #007bff;

    &:hover {
      color: #0056b3;
    }
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => setOnEdit(item);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8800/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success(response.data);
    } catch (error) {
      toast.error("Erro ao deletar usuário");
    }
    setOnEdit(null);
  };

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Telefone</Th>
            <Th>Produto</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <tbody>
          {users.map((item, index) => (
            <Tr key={index}>
              <Td>{item.nome}</Td>
              <Td>{item.fone}</Td>
              <Td>{item.produto}</Td>
              <Td>{item.status}</Td>
              <Td>
                <FaEdit onClick={() => handleEdit(item)} />
                <FaTrash onClick={() => handleDelete(item.id)} />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default Grid;
