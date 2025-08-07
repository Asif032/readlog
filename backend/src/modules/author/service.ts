import { AuthorRepository } from "./repository";
import { AuthorInsert, AuthorUpdate, AuthorSelect } from '../../database/types';
import { CreateAuthorDto,UpdateAuthorDto, AuthorListOptions, PaginatedAuthors } from './dto';

export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  async create(authorData: CreateAuthorDto): Promise<void> {
    const authorInsert: AuthorInsert = {
      ...authorData
    }
    return await this.authorRepository.create(authorInsert);
  }

  async get(id: string): Promise<AuthorSelect> {
    const author = await this.authorRepository.findById(id);
    if (!author) {
      throw new Error("Auhtor not found.");
    }
    return author;
  }

  async getByName(name: string) {
     if (!name || name.trim() === '') {
      throw new Error('Name cannot be empty');
    }
    return await this.authorRepository.findByName(name);
  }

  async searchByName(name: string) {
     if (!name || name.trim() === '') {
      throw new Error('Name cannot be empty');
    }
    return await this.authorRepository.searchByName(name);
  }

  async getAll(): Promise<AuthorSelect[]> {
    return await this.authorRepository.findAll();
  }

  async update(id: string, authorData: UpdateAuthorDto): Promise<AuthorSelect> {
    const authorUpdate: AuthorUpdate = {
      ...authorData
    }
    const updatedAuthor = await this.authorRepository.update(id, authorUpdate);
    if (!updatedAuthor) {
      throw new Error("Author could not be updated");
    }
    return updatedAuthor;
  }

  async delete(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }

  async hardDelete(id: string): Promise<void> {
    await this.authorRepository.hardDelete(id);
  }

}