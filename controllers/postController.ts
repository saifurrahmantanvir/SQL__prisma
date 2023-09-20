import { Request, Response, NextFunction } from 'express';
import APIError from '@utils/appError';
import tryCatch from '@utils/tryCatch';

import prisma from '@utils/prismaClient';

export const getAllPosts = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await prisma.post.findMany();

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    });
  }
);

export const createPost = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, authorId } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(authorId),
        updatedAt: new Date().toISOString(),
      }
    })

    console.log(post);

    res.status(201).json({
      status: 'success',
      data: {
        post
      }
    });
  }
)

/* TASK: MIGRATION__ Change user to author. also in the schema.prisma file */
export const getPost = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        comments: true
      }
    });

    if (!post) {
      return next(new APIError('Post not found with that id!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  }
);

export const updatePost = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: req.body
    })

    if (!post) {
      return next(new APIError("Couldn't update the post with that id!", 500));
    }

    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  }
);

export const deletePost = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const post = await prisma.post.delete({
      where: { id: Number(id) }
    })

    if (!post) {
      return next(new APIError('Post not found with that id!', 404));
    }

    res.status(204).json({
      status: 'success',
      message: 'Post has been deleted successfully'
    });
  }
);

/* TESTING COMPLETE 🔥🔥 */