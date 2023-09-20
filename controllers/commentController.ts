import { Request, Response, NextFunction } from "express";
import tryCatch from "@utils/tryCatch";
import APIError from "@utils/appError";
import prisma from "@utils/prismaClient";

export const getAllComments = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const comments = await prisma.comment.findMany();

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: {
        comments
      }
    });
  }
);

export const createComment = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment = await prisma.comment.create({
      /* TASK: Convert the data to dynamic in postman */
      data: req.body
    })

    res.status(201).json({
      status: 'success',
      data: {
        comment
      }
    });
  }
)

/* // TASK: test this route. infact test all the routes */
export const getComment = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) }
    });

    if (!comment) {
      return next(new APIError('Comment not found with that id!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        comment
      }
    });
  }
);

export const updateComment = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    /* const { id } = req.params;

    const comment = await prisma.comment.update({
      where: { id: Number(id) },
      data: req.body
    })

    if (!comment) {
      return next(new APIError("Couldn't update the comment with that id!", 500));
    } */

    res.status(500).json({
      status: 'error',
      message: 'Comment can\'t be updated! This route doesn\'t exist.'
    });
  }
);

export const deleteComment = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const comment = await prisma.comment.delete({
      where: { id: Number(id) }
    })

    if (!comment) {
      return next(new APIError('Comment not found with that id!', 404));
    }

    res.status(204).json({
      status: 'success',
      message: 'Comment has been deleted successfully'
    });
  }
);

/* TESTING COMPLETE 🔥🔥 */