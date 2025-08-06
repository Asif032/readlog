import bcrypt from 'bcrypt';
import { UserRepository  } from './repository';
import { UserInsert, UserUpdate, UserSelect } from '../../database/types';
import { CreateUserDto,UpdateUserDto, UserListOptions, PaginatedUsers } from './dto';


export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(userData: CreateUserDto): Promise<UserSelect> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const userInsert: UserInsert = {
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
      bio: userData.bio || null,
      date_of_birth: userData.date_of_birth || null,
      is_active: true,
      role: userData.role || 'USER',
    };

    return await this.userRepository.create(userInsert);
  }

  async getById(id: string): Promise<UserSelect> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getByEmail(email: string): Promise<UserSelect> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getAll(options: UserListOptions = {}): Promise<PaginatedUsers> {
    const { page = 1, limit = 50, role } = options;
    const offset = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userRepository.findAll(limit, offset, role),
      this.userRepository.count(role),
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: string, userData: UpdateUserDto): Promise<UserSelect> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const userUpdate: UserUpdate = {
      name: userData.name,
      bio: userData.bio,
      date_of_birth: userData.date_of_birth,
      role: userData.role,
    };

    const updatedUser = await this.userRepository.update(id, userUpdate);
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    return updatedUser;
  }

  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await this.userRepository.update(id, { password: hashedNewPassword });
  }

  async delete(id: string, hard: boolean = false): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (hard) {
      await this.userRepository.hardDelete(id);
    } else {
      await this.userRepository.softDelete(id);
    }
  }

  async toggleActiveStatus(id: string): Promise<UserSelect> {
    const user = await this.userRepository.toggleActiveStatus(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async validatePassword(email: string, password: string): Promise<UserSelect> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    if (!user.is_active) {
      throw new Error('Account is deactivated');
    }

    // Update last active
    await this.userRepository.updateLastActive(user.id);

    return user;
  }

  excludePassword(user: UserSelect): Omit<UserSelect, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}