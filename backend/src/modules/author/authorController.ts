import { Request, Response } from 'express';
import { AuthorService } from './authorService';
import { CreateAuthorDto, UpdateAuthorDto } from './authorDto';
import { success } from '../../utils/api-response';

export class AuthorController {
  constructor(private authorService: AuthorService) {}

  create = async(req: Request, res: Response): Promise<void> => {
    const authorData: CreateAuthorDto = req.body;
    await this.authorService.create(authorData);
    res.status(201).json(success(null));
  }
  
  get = async(req: Request, res: Response): Promise<void> => {
    const author = await this.authorService.get(req.params.id);
    res.json(success(author));
  }

  getAll = async(req: Request, res: Response): Promise<void> => {
    const authors = await this.authorService.getAll();
    res.json(success(authors));
  }

  getByName = async(req: Request, res: Response): Promise<void> => {
    const author = await this.authorService.getByName(req.params.name);
    res.json(success(author));
  }

  searchByName = async(req: Request, res: Response): Promise<void> => {
    const author = await this.authorService.searchByName(req.params.name);
    res.json(success(author));
  }

  update = async(req: Request, res: Response): Promise<void> => {
    const authorData: UpdateAuthorDto = req.body;
    const updatedAuthor = await this.authorService.update(req.params.id, authorData);
    res.json(success(updatedAuthor));
  }

  delete = async(req: Request, res: Response): Promise<void> => {
    await this.authorService.delete(req.params.id);
    res.json(success(null));
  }

  hardDelete = async(req: Request, res: Response): Promise<void> => {
    await this.authorService.hardDelete(req.params.id);
    res.json(success(null));
  }
  
}