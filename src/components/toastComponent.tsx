import Toast from 'react-native-toast-message';

interface CustomToastProps {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
}

export const CustomToast = ({
  type,
  text1,
  text2,
  position = 'bottom',
  visibilityTime = 3000,
  autoHide = true,
}: CustomToastProps) => {
  Toast.show({
    type,
    position,
    text1,
    text2,
    visibilityTime,
    autoHide,
  });
};
