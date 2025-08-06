import { Request, Response } from 'express';
import { AuthorService } from './service';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';

export class AuthorController {
  constructor(private authorService: AuthorService) {}

  create = async(req: Request, res: Response): Promise<void> => {
    try {
      const authorData: CreateAuthorDto = req.body;
      await this.authorService.create(authorData);
      res.status(201).json({
        message: 'Author created successfully'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to create new author'
      });
    }
  }

  get = async(req: Request, res: Response): Promise<void> => {
    try {
      
    } catch (error) {

    }
  }
}