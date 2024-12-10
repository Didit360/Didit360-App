import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateRequest } from '../middleware/validateRequest';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';

export const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', validateRequest(createUserSchema), userController.createUser);
userRouter.put('/:id', validateRequest(updateUserSchema), userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);