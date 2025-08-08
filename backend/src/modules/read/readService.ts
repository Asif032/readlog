import { ReadRepository } from "./readRepository";
import { ReadInsert, ReadUpdate, ReadSelect, ReadStatus, BookSelect } from '../../database/types';
import { CreateReadDto, UpdateReadDto } from './readDto';

export class ReadService {
  constructor(
    private readRepository: ReadRepository,
  ) {}

  async create(readData: CreateReadDto): Promise<void> {
    const readInsert: ReadInsert = { ...readData };
    await this.readRepository.create(readInsert);
  }

  async findById(id: bigint): Promise<ReadSelect | undefined> {
    return this.readRepository.findById(id);
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<ReadSelect[]> {
    return this.readRepository.findAll(limit, offset);
  }

  async update(id: bigint, readData: UpdateReadDto): Promise<ReadSelect | undefined> {
    const readUpdate: ReadUpdate = {
      ...readData
    }
    return this.readRepository.update(id, readUpdate);
  }

  async delete(id: bigint): Promise<void> {
    await this.readRepository.delete(id);
  }

  async hardDelete(id: bigint): Promise<void> {
    await this.readRepository.hardDelete(id);
  }
  async getBooksByUserId(userId: string, status?: ReadStatus): Promise<BookSelect[]> {
    return this.readRepository.findBooksByUserId(userId, status);
  }

  async countReadersByBookId(bookId: bigint): Promise<number> {
    return this.readRepository.countReadersByBookId(bookId);
  }
}