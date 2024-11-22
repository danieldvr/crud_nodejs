import { check, validationResult } from 'express-validator';

// Validação para o campo nome (somente letras)
const nameValidation = check('nome')
  .isAlpha('pt-BR', { ignore: ' ' }) // Permite apenas letras e espaços
  .withMessage('O nome deve conter apenas letras.');

// Validação para o campo telefone (somente números)
const phoneValidation = check('fone')
  .isNumeric()
  .withMessage('O telefone deve conter apenas números.')
  .isLength({ min: 10, max: 11 })
  .withMessage('O telefone deve ter 10 ou 11 dígitos.');

// Validação para o campo email (email válido)
const emailValidation = check('email')
  .isEmail()
  .withMessage('Insira um email válido.');

// Middleware para processar as validações
export const validateUser = [
  nameValidation,
  phoneValidation,
  emailValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
