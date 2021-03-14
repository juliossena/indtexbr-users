import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

import logger from '../utils/log';
import { typeUser } from '../enums/typeUser';
import { notFound, internalError, customError } from '../utils/response';
import User from '../models/user';

const searchUser = async (email: string) => {
  const user = await User.findOne({
    where: { email: email.toLowerCase() },
  });
  return user;
};

// POST
// service to insert user admin company
export const insertAdmin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      email,
      name,
      password,
    } = req.body;

    const userCheck = await searchUser(email);

    if (userCheck) {
      return customError(res, 'Login digitado já foi utilizado.');
    }

    const passwordHashed = await hash(`${password}`, 8);
    console.log('passwordHashed', passwordHashed);

    const user = await User.create({
      email: email.toLowerCase(),
      name,
      idTypeUser: typeUser.USUARIO,
      password: passwordHashed,
    });

    return res.status(201).send(user);
  } catch (e) {
    logger.error(e);
    return internalError(res);
  }
};

// POST
// service to insert user admin company
export const insertUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      email,
      name,
      password,
    } = req.body;

    const userCheck = await searchUser(email);

    if (userCheck) {
      return customError(res, 'Login digitado já foi utilizado.');
    }

    const passwordHashed = await hash(`${password}`, 8);

    const user = await User.create({
      email: email.toLowerCase(),
      name,
      idTypeUser: typeUser.USUARIO,
      password: passwordHashed,
    });

    return res.status(201).send(user);
  } catch (e) {
    logger.error(e);
    return internalError(res);
  }
};

// GET
// service to view all users company
export const viewAllUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await User.findAll({
      attributes: ['idUser', 'email', 'name', 'idTypeUser'],
      include: [{
        association: 'typeUser',
        attributes: ['idTypeUser', 'name'],
      }],
    });
    return res.json(result);
  } catch (e) {
    logger.error(e);
    internalError(res);
  }
};

// GET
// service to view user id
export const viewUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idUser } = req.params;
    const result = await User.findOne({
      attributes: ['idUser', 'email', 'name', 'idTypeUser'],
      where: {
        idUser,
      },
    });
    if (result) {
      return res.json(result);
    }
    return notFound(res);
  } catch (e) {
    logger.error(e);
    return internalError(res);
  }
};

// DELETE
// service to delete user id
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idUser } = req.params;
    const result = await User.findOne({
      where: {
        idUser,
      },
    });

    if (!result) {
      return notFound(res);
    }

    await result.destroy();

    return res.status(204).send();
  } catch (e) {
    logger.error(e);
    internalError(res);
  }
};

// PUT
// service to edit user
export const editUser = async (req: Request, res: Response): Promise<Response> => {
  const { idUser } = req.params;
  const user = await User.findOne({
    where: { idUser },
  });
  const {
    email,
    name,
  } = req.body;

  user.update({
    ...user,
    email,
    name,
  });
  return res.json(user);
};
