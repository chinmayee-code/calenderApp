import {extendTheme} from 'native-base';
import {Dimensions} from 'react-native';

export const COLORS = {
  primary: {
    50: '#D9E4FF',
    100: '#B0C7FF',
    200: '#87AAFF',
    300: '#5E8DFF',
    400: '#356FFF',
    500: '#0C52FF',
    600: '#0A43D6',
    700: '#0835AD',
    800: '#062682',
    900: '#041856',
    950: '#020A2B',
  },
  // primary: '#5B50A1',
  dark: '#161719',
  white: '#fff',
  body: '#405792',
  bg: '#ECECEC',
};

const CustomTheme = extendTheme({
  colors: COLORS,
});

export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;

export default CustomTheme;
