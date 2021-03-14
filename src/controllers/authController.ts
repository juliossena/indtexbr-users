import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import logger from '../utils/log';
import { notFound, internalError } from '../utils/response';
import User from '../models/user';

const searchUser = async (email: string) => {
  const user = await User.findOne({
    where: { email: email.toLowerCase() },
  });

  return user;
};

// POST
// service to Auth
export const auth = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      email,
      password,
    } = req.body;
    const user = await searchUser(email);

    if (!user) {
      return notFound(res);
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      return notFound(res);
    }
    res.json({ user });
  } catch (e) {
    logger.error(e);
    internalError(res);
  }
};
