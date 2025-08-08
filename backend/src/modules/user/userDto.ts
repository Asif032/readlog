import { UserRole, UserSelect } from "../../database/types";

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  bio?: string;
  date_of_birth?: Date;
  role?: UserRole;
}

export interface UpdateUserDto {
  name?: string;
  bio?: string;
  date_of_birth?: Date;
  role?: UserRole;
}

export interface UserListOptions {
  page?: number;
  limit?: number;
  role?: UserRole;
}

export interface PaginatedUsers {
  users: UserSelect[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
