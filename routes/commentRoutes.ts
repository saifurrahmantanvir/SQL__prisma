import express from 'express'

import {
   createComment,
   deleteComment,
   getAllComments,
   getComment,
   updateComment
} from '@controllers/commentController'

const router = express.Router()

router.route('/')
   .get(getAllComments)
   .post(createComment)

router.route('/:id')
   .get(getComment)
   .patch(updateComment)
   .delete(deleteComment);

export default router;