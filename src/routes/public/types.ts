import {Auth, Public} from '../../screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type PublicScreens = {
  [key in keyof typeof Public]: undefined;
};

type AuthScreens = {
  [key in keyof typeof Auth]: undefined;
};

type OmittedScreen = 'ResetPassword' | 'OTPVerification';

export type PublicNavigationProp = Omit<PublicScreens, OmittedScreen> & {
  ResetPassword: {otpValue?: string; username?: string};
  OTPVerification: {username?: string};
};

export type PublicRoutesTypes = PublicScreens & AuthScreens;

export type PublicRouteProps = NativeStackNavigationProp<PublicRoutesTypes>;
