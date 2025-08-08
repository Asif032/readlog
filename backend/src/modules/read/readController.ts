import { Request, Response } from 'express';
import { ReadService } from './readService';
import { CreateReadDto, UpdateReadDto, ReadListOptions } from './readDto';
import { ReadStatus } from '../../database/types';
import { success } from '../../utils/api-response';

export class ReadController {
  constructor(private readService: ReadService) {}

  create = async(req: Request, res: Response): Promise<void> => {
    const readData: CreateReadDto = req.body;
    await this.readService.create(readData);
    res.status(201).json(success(null));
  }

  get = async(req: Request, res: Response): Promise<void> => {
    const read = await this.readService.findById(BigInt(req.params.id));
    res.json(success(read));
  }

  getAll = async(req: Request, res: Response): Promise<void> => {
    const options: ReadListOptions = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined
    };
    const reads = await this.readService.findAll(options.limit || 50, options.page ? (options.page - 1) * (options.limit || 50) : 0);
    res.json(success(reads));
  }

  update = async(req: Request, res: Response): Promise<void> => {
    const readData: UpdateReadDto = req.body;
    const updatedRead = await this.readService.update(BigInt(req.params.id), readData);
    res.json(success(updatedRead));
  }

  delete = async(req: Request, res: Response): Promise<void> => {
    await this.readService.delete(BigInt(req.params.id));
    res.json(success(null));
  }

  hardDelete = async(req: Request, res: Response): Promise<void> => {
    await this.readService.hardDelete(BigInt(req.params.id));
    res.json(success(null));
  }
  
  getBooksByUserId = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const status = req.query.status as ReadStatus | undefined;
    const books = await this.readService.getBooksByUserId(userId, status);
    res.json(success(books));
  }

  countReadersByBookId = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const count = await this.readService.countReadersByBookId(BigInt(bookId));
    res.json(success({ count }));
  }
}