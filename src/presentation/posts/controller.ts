import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../application/errors';
import { PostRepository } from '../../application/repositories/post.repository';

import { CreatePostDto } from '../../application/dtos/posts/create-post.dto';
import { GetPostByIdDto } from '../../application/dtos/posts/get-post-by-id.dto';

import {
  CreatePostUseCase,
  GetPostUseCase,
  GetPostsUseCase,
  SoftDeletePostUseCase
} from '../../application/use-cases/posts';

import { GetPostsFilterDto } from '../../application/dtos/posts/get-posts-filter.dto';
import { SoftDeletePostDto } from '../../application/dtos/posts/soft-delete-post.dto';

export class PostController {

  constructor(
    private readonly repository: PostRepository
  ) {}

  // // Error handler 
  // private handleError(error: unknown, res: Response) {
  //   if (error instanceof CustomError) {
  //     return res.status(error.statusCode).json({
  //       status: false,
  //       message: error.message
  //     });
  //   }

  //   console.error(error);
  //   return res.status(500).json({
  //     status: false,
  //     message: 'Internal Server Error'
  //   });
  // }

  // POST /posts
  create = (req: Request, res: Response, next: NextFunction) => {
    const [error, dto] = CreatePostDto.create(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error
      });
    }

    new CreatePostUseCase(this.repository)
      .execute(dto!)
      .then(post =>
        res.status(201).json({
          status: true,
          data: post
        })
      )
      .catch(next);
  };

  // GET /posts
  findAll = (req: Request, res: Response,  next: NextFunction) => {
    const [error, filters] = GetPostsFilterDto.create(req.query);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error
      });
    }

    new GetPostsUseCase(this.repository)
      .execute(filters!)
      .then(result =>
        res.json({
          status: true,
          data: result
        })
      )
      .catch(next);
  };

  // GET /posts/:id
  findById = (req: Request, res: Response, next: NextFunction) => {
    const [error, dto] = GetPostByIdDto.create(req.params);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error
      });
    }

    new GetPostUseCase(this.repository)
      .execute(dto!.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({
            status: false,
            message: 'Post not found'
          });
        }

        res.json({
          status: true,
          data: post
        });
      })
      .catch(next);
  };

  // DELETE /posts/:id
  delete = (req: Request, res: Response, next: NextFunction) => {

    const [error, dto] = SoftDeletePostDto.create(req.params);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error
      });
    }

    new SoftDeletePostUseCase(this.repository)
      .execute(dto!.id)
      .then(() => res.status(204).send())
      .catch(next);
  };




  }
