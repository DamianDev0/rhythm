import {renderHook, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';

import {UserController} from '../core/infrastructure/controllers/user.controller';
import {CustomToast} from '../src/components/toastComponent';
import useNavigation from '../src/hook/useNavigation';
import useRegister from '../src/screens/signUpScreen/hook/useRegister';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../core/infrastructure/controllers/user.controller', () => ({
  UserController: {
    RegisterUser: jest.fn(),
  },
}));

jest.mock('../src/components/toastComponent', () => ({
  CustomToast: jest.fn(),
}));

jest.mock('../src/hook/useNavigation', () => jest.fn());

describe('useRegister', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});
    jest.clearAllMocks();
  });

  it('should update credentials correctly', () => {
    const {result} = renderHook(() => useRegister());
    act(() => {
      result.current.handleInputChange('name', 'joji the best');
    });
    expect(result.current.credentials.name).toBe('joji the best');
  });

  it('should show error toast if fields are empty', async () => {
    const {result} = renderHook(() => useRegister());
    await act(async () => {
      await result.current.handleRegister();
    });
    expect(CustomToast).toHaveBeenCalledWith({
      position: 'top',
      type: 'error',
      text1: 'Error',
      text2: 'Please fill in all fields.',
    });
    expect(result.current.loading).toBe(false);
  });

  it('should call UserController.RegisterUser and navigate to Login on successful registration', async () => {
    const mockResponse = {
      code: 201,
      data: {
        accessToken: 'token123',
        id: 'user123',
      },
    };
    (UserController.RegisterUser as jest.Mock).mockResolvedValueOnce(
      mockResponse,
    );

    const {result} = renderHook(() => useRegister());
    act(() => {
      result.current.handleInputChange('name', 'Test User');
      result.current.handleInputChange('email', 'test@example.com');
      result.current.handleInputChange('password', 'password123');
    });

    await act(async () => {
      await result.current.handleRegister();
    });

    expect(UserController.RegisterUser).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(CustomToast).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Success',
      text2: 'User registered successfully.',
    });

    expect(mockNavigate).toHaveBeenCalledWith('Login');
    expect(result.current.loading).toBe(false);
  });

  it('should show error toast on registration failure', async () => {
    (UserController.RegisterUser as jest.Mock).mockResolvedValueOnce({
      message: 'Registration failed',
    });

    const {result} = renderHook(() => useRegister());
    act(() => {
      result.current.handleInputChange('name', 'Test User');
      result.current.handleInputChange('email', 'test@example.com');
      result.current.handleInputChange('password', 'password123');
    });

    await act(async () => {
      await result.current.handleRegister();
    });

    expect(CustomToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text1: 'Error',
        text2: 'Registration failed',
      }),
    );

    expect(result.current.loading).toBe(false);
  });
});
