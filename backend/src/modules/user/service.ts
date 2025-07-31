import { User } from '@prisma/client'
import { UserRepository } from './repository'

export const getAllUsers = async (): Promise<User[]> => {
  return UserRepository.findAll()
}

export const createUser = async (data: Partial<User>) => {
  return UserRepository.create(data)
}
