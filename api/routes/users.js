import express from "express";
import { validateUser } from '../validators/userValidation.js'; 
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/", addUser)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

router.post('/user', validateUser, addUser);

router.put('/user/:id', validateUser, updateUser);

export default router