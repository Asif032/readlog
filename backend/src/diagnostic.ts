import { container } from './container';

async function runDiagnostic() {
  console.log('=== CONTAINER DIAGNOSTIC ===');
  
  try {
    // Test user service
    console.log('✓ Testing userService...');
    const userService = container.resolve('userService');
    console.log('✓ userService resolved successfully');
    console.log('✓ userService.getAll exists:', typeof userService.getAll === 'function');
    
    // Test user controller
    console.log('✓ Testing userController...');
    const userController = container.resolve('userController');
    console.log('✓ userController resolved successfully');
    console.log('✓ userController.getAll exists:', typeof userController.getAll === 'function');
    
    // Test user repository
    console.log('✓ Testing userRepository...');
    const userRepository = container.resolve('userRepository');
    console.log('✓ userRepository resolved successfully');
    console.log('✓ userRepository.findAll exists:', typeof userRepository.findAll === 'function');
    
    // Test all other services
    console.log('✓ Testing bookService...');
    const bookService = container.resolve('bookService');
    console.log('✓ bookService resolved successfully');
    
    console.log('✓ Testing authorService...');
    const authorService = container.resolve('authorService');
    console.log('✓ authorService resolved successfully');
    
    console.log('✓ Testing db...');
    const db = container.resolve('db');
    console.log('✓ db resolved successfully');
    
  } catch (error) {
    console.error('❌ Resolution error:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
  }
  
  console.log('\n=== CONTAINER REGISTRY ===');
  console.log('Available registrations:', container.registrations);
}

runDiagnostic();