import express from 'express';

import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} from '@controllers/postController';

const router = express.Router();

router.route('/')
  .get(getAllPosts)
  .post(createPost);

router.route('/:id')
  .get(getPost)
  .patch(updatePost)
  .delete(deletePost);

export default router;
