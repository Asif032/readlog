import { Request, Response } from 'express';
import { UserService } from './service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRole } from '../../database/types';

export class UserController {
  constructor(private userService: UserService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;

      // Basic validation
      if (!userData.email || !userData.name || !userData.password) {
        res.status(400).json({
          error: 'Email, name, and password are required',
        });
        return;
      }

      const user = await this.userService.create(userData);
      const userResponse = this.userService.excludePassword(user);

      res.status(201).json({
        message: 'User created successfully',
        data: userResponse,
      });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Failed to create user',
      });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.getById(id);
      const userResponse = this.userService.excludePassword(user);

      res.json({
        data: userResponse,
      });
    } catch (error) {
      res.status(404).json({
        error: error instanceof Error ? error.message : 'User not found',
      });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const role = req.query.role as UserRole;

      const result = await this.userService.getAll({ page, limit, role });

      // Exclude passwords from all users
      const usersWithoutPasswords = result.users.map(user =>
        this.userService.excludePassword(user)
      );

      res.json({
        data: {
          ...result,
          users: usersWithoutPasswords,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to fetch users',
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userData: UpdateUserDto = req.body;

      const user = await this.userService.update(id, userData);
      const userResponse = this.userService.excludePassword(user);

      res.json({
        message: 'User updated successfully',
        data: userResponse,
      });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Failed to update user',
      });
    }
  };

  changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        res.status(400).json({
          error: 'Current password and new password are required',
        });
        return;
      }

      await this.userService.changePassword(id, currentPassword, newPassword);

      res.json({
        message: 'Password changed successfully',
      });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Failed to change password',
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const hard = req.query.hard === 'true';

      await this.userService.delete(id, hard);

      res.json({
        message: hard ? 'User deleted permanently' : 'User deleted successfully',
      });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Failed to delete user',
      });
    }
  };

  toggleActiveStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.toggleActiveStatus(id);
      const userResponse = this.userService.excludePassword(user);

      res.json({
        message: `User ${user.is_active ? 'activated' : 'deactivated'} successfully`,
        data: userResponse,
      });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Failed to toggle user status',
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          error: 'Email and password are required',
        });
        return;
      }

      const user = await this.userService.validatePassword(email, password);
      const userResponse = this.userService.excludePassword(user);

      res.json({
        message: 'Login successful',
        data: userResponse,
      });
    } catch (error) {
      res.status(401).json({
        error: error instanceof Error ? error.message : 'Login failed',
      });
    }
  };
}