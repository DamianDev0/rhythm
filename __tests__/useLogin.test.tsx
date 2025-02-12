import {renderHook, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';

import {UserController} from '../core/infrastructure/controllers/user.controller';
import {CustomToast} from '../src/components/toastComponent';
import useNavigation from '../src/hook/useNavigation';
import {setToken} from '../src/redux/tokenSlice';
import useLogin from '../src/screens/loginScreen/hook/useLogin';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../core/infrastructure/controllers/user.controller', () => ({
  UserController: {
    LoginUser: jest.fn(),
  },
}));

jest.mock('../src/components/toastComponent', () => ({
  CustomToast: jest.fn(),
}));

jest.mock('../src/hook/useNavigation', () => jest.fn());

describe('useLogin', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});
    jest.clearAllMocks();
  });

  it('should update credentials correctly', () => {
    const {result} = renderHook(() => useLogin());
    act(() => {
      result.current.handleInputChange('email', 'test@example.com');
    });
    expect(result.current.credentials.email).toBe('test@example.com');
  });

  it('should show error toast if fields are empty', async () => {
    const {result} = renderHook(() => useLogin());
    await act(async () => {
      await result.current.handleLogin();
    });
    expect(CustomToast).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error',
      text2: 'Please fill in all fields.',
      position: 'top',
    });
    expect(result.current.loading).toBe(false);
  });

  it('should call UserController.LoginUser and navigate to Home on successful login', async () => {
    const mockResponse = {
      data: {
        accessToken: 'token123',
        id: 'user123',
      },
    };
    (UserController.LoginUser as jest.Mock).mockResolvedValueOnce(mockResponse);

    const {result} = renderHook(() => useLogin());
    act(() => {
      result.current.handleInputChange('email', 'test@example.com');
      result.current.handleInputChange('password', 'password123');
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(UserController.LoginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setToken({
        token: 'token123',
        userId: 'user123',
      }),
    );

    expect(CustomToast).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Success',
      text2: 'Logged in successfully.',
      position: 'top',
    });

    expect(mockNavigate).toHaveBeenCalledWith('Home');
    expect(result.current.loading).toBe(false);
  });

  it('should show error toast on login failure', async () => {
    (UserController.LoginUser as jest.Mock).mockResolvedValueOnce({
      message: 'Invalid credentials',
    });

    const {result} = renderHook(() => useLogin());
    act(() => {
      result.current.handleInputChange('email', 'test@example.com');
      result.current.handleInputChange('password', 'password123');
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(CustomToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid credentials',
      }),
    );

    expect(result.current.loading).toBe(false);
  });
});
