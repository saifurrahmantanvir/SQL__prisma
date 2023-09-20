import { NextFunction, Request, Response } from 'express';
import prisma from '@utils/prismaClient';
import APIError from '@utils/appError';
import tryCatch from '@utils/tryCatch';

export const getAllUsers = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany();

    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users
      }
    });
  }
);

export const createUser = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, bio } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        profile: {
          create: { bio }
        }
      }
    });

    res.status(201).json({
      status: 'success',
      data: {
        user
      }
    });
  }
);

export const getUser = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        profile: true,
        post: true
      }
    });

    if (!user) {
      return next(new APIError('User not found with that id!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  }
);

export const updateUser = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body
    })

    if (!user) {
      return next(new APIError("Couldn't update the user with that id!", 500));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  }
);

/**
 * TASK: This route is not working and throwing `Foreign key constraint failed on the field: `userId``
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
*/
export const deleteUser = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await prisma.user.delete({
      where: { id: Number(id) }
    })

    console.log(user);

    if (!user) {
      return next(new APIError('User not found with that id!', 404));
    }

    res.status(204).json({
      status: 'success',
      message: 'User has been deleted successfully'
    });
  }
);
