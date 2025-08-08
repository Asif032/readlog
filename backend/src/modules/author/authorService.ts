import { DB } from "../../database/connection";
import { AuthorRepository } from "./authorRepository";
import { AuthorInsert, AuthorUpdate, AuthorSelect } from '../../database/types';
import { CreateAuthorDto,UpdateAuthorDto, AuthorListOptions, PaginatedAuthors } from './authorDto';

export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  async create(authorData: CreateAuthorDto): Promise<void> {
    const authorInsert: AuthorInsert = {
      ...authorData
    };
    return await this.authorRepository.create(authorInsert);
  }

  async createMultiple(authors: CreateAuthorDto[], trx?: DB): Promise<string[]> {
    const authorInserts: AuthorInsert[] = authors.map((author) => ({
      name: author.name,
      date_of_birth: author.date_of_birth,
      date_of_death: author.date_of_death,
      description: author.description,
    }));
    return await this.authorRepository.createMultiple(authorInserts, trx);
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