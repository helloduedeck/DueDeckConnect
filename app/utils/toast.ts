import RNToast from 'react-native-root-toast';
import {colors} from '../theme';

const success = (msg: string) => {
  normal(msg, {
    backgroundColor: colors.greenDark,
    textColor: colors.white
  });
};

const failure = (msg: string) => {
  normal(msg, {
    backgroundColor: `${colors.darkred}10`,
    textColor: colors.darkred,
    // position: { bottom: 100, right: 20 } 
   

  });
};

const normal = (msg: string, config?: any) => {
  RNToast.show(msg, {
    // shadow: true,
    // animation: true,
    ...config,
  });
};

const toast = {
  normal,
  success,
  failure,
};

export default toast;
