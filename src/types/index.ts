import {SvgProps} from 'react-native-svg';

export type IconType = SvgProps & {
  size?: number;
  color?: string;
};

export type User = {
  id: string;
  name: string | null;
  email: string;
  password: string;
  phone: string | null;
  isBlocked: boolean;
  photo: string | null;
  dob: Date | null;
  gender?: Gender;
  role?: string;
  fcmTokens: FCMToken | null;
  isOnline: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type FCMToken = {
  web: string | null;
  android: string | null;
  ios: string | null;
};

const Gender = {
  Male: 'Male',
  Female: 'Female',
};

export type Gender = keyof typeof Gender;
