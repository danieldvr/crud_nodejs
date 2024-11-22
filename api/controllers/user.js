import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json(data);
  });
};

// Função para adicionar um usuário
export const addUser = (req, res) => {
  // Consultar para inserir um novo usuário
  const q = `INSERT INTO usuarios (
    nome, 
    email, 
    fone, 
    data_nascimento, 
    produto, 
    descricao, 
    status, 
    tipo
  ) VALUES (?)`;

  // Valores a serem inseridos
  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
    req.body.produto,
    req.body.descricao,
    req.body.status || "iniciado", 
    req.body.tipo || "físico"       
  ];

  // Executando a consulta
  db.query(q, [values], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(201).json("Usuário criado com sucesso.");
  });
};

// Função para atualizar um usuário
export const updateUser = (req, res) => {
  // Consulta para atualizar um usuário existente
  const q = `UPDATE usuarios SET 
    nome = ?, 
    email = ?, 
    fone = ?, 
    data_nascimento = ?, 
    produto = ?, 
    descricao = ?, 
    status = ?, 
    tipo = ? 
  WHERE id = ?`;

  // Valores para a atualização
  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
    req.body.produto,
    req.body.descricao,
    req.body.status,
    req.body.tipo
  ];

  // Executando a consulta
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

// Função para deletar um usuário
export const deleteUser = (req, res) => {
  // Consulta para deletar um usuário pelo ID
  const q = "DELETE FROM usuarios WHERE id = ?";

  // Executando a consulta
  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
