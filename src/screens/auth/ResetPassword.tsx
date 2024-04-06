import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Center,
  IInputProps,
  HStack,
  Spinner,
  ScrollView,
  useToast,
  Text,
} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useWindowDimensions} from 'react-native';
import {AppInput, Btn} from '~/components/core';
import {IconProps} from '~/components/core/AppIcon';
import {PublicRouteProps, PublicRoutesTypes} from '~/routes/public/types';
import AnimatedLottieView from 'lottie-react-native';
import {ANIMATIONS} from '~/assets';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useMutation from '~/hooks/useMutation';
// Define FormInput and FormData types
type FormValues = {
  newPassword: string;
  confirmPassword: string;
};
type FormInput = {
  key: keyof FormValues;
  label: string;
  placeholder: string;
  icon: IconProps;
  rules: Object;
  inputProps?: IInputProps;
};
type FormData = {
  [key: string]: string;
};

type Props = NativeStackScreenProps<PublicRoutesTypes, 'ResetPassword'>;
export default function ResetPassword({route: {params}}: Props): JSX.Element {
  const toast = useToast();
  const [obj, setObj] = useState({
    email: params?.username,
    OTP: params?.otpValue,
  });
  console.log('iii', obj);
  useEffect(() => {
    setObj({
      email: params?.username,
      OTP: params?.otpValue,
    });
  }, [params]);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const {navigate} = useNavigation<PublicRouteProps>();
  const screenWidth = useWindowDimensions().width;
  const {mutation: resetPassword, isLoading} = useMutation();
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormData>();
  const handleChangePassword = async (data: FormData) => {
    try {
      const {email, OTP} = obj;
      const res = await resetPassword('user/forget-password', {
        body: {
          email,
          OTP,
          newPassword: data?.newPassword,
        },
      });

      if (res?.status === 200) {
        toast.show({
          title: res?.results?.message,
          duration: 3000,
          bg: 'success.400',
        });
        navigate('Login');
      } else {
        toast.show({
          title: res?.results?.error?.message,
          duration: 3000,
          bg: 'error.600',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formInputs: FormInput[] = useMemo(() => {
    const inputFields: FormInput[] = [
      {
        key: 'newPassword',
        label: 'New Password',
        placeholder: 'Enter new password',
        icon: {FeatherName: 'lock'},
        rules: {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
        },
        inputProps: {
          secureTextEntry,
          // keyboardType: 'visible-password',

          autoCapitalize: 'none',
          rightElement: (
            <Btn
              colors={['transparent', 'transparent']}
              _text={{color: 'black', fontSize: 'xs'}}
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? 'Show' : 'Hide'}
            </Btn>
          ),
        },
      },
      {
        key: 'confirmPassword',
        label: 'Confirm Password',
        placeholder: 'Enter  password again',
        icon: {FeatherName: 'lock'},
        rules: {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
          validate: (value: string) => {
            if (watch('newPassword') != value) {
              return ' Your Passwords do not match';
            }
          },
        },

        inputProps: {
          secureTextEntry: secureTextEntryConfirm,
          autoCapitalize: 'none',
          rightElement: (
            <Btn
              colors={['transparent', 'transparent']}
              _text={{color: 'black', fontSize: 'xs'}}
              onPress={() =>
                setSecureTextEntryConfirm(!secureTextEntryConfirm)
              }>
              {secureTextEntryConfirm ? 'Show' : 'Hide'}
            </Btn>
          ),
        },
      },
    ];

    return inputFields;
  }, [secureTextEntry, secureTextEntryConfirm]);
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        h={'100%'}
        flex={1}
        bg={'#fff'}
        px={screenWidth * 0.04}
        py={screenWidth * 0.05}>
        <Center
          flexGrow={1}
          h="100%"
          px={screenWidth * 0.04}
          py={screenWidth * 0.05}
          w="full">
          <Box
            size={'200'}
            bg={'lightBlue.50'}
            justifyContent={'center'}
            borderRadius={'full'}>
            <Box size={'150'} alignSelf={'center'}>
              {/* <AnimatedLottieView
                source={ANIMATIONS.lock}
                autoPlay
                loop={true}
              /> */}
            </Box>
          </Box>
          <Text mt="5" mb="4" fontSize="24" bold color={'primary.400'}>
            Reset Password
          </Text>

          {formInputs.map(input => (
            // Render your input components here
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
            />
          ))}

          <Box w="full" mt={4}>
            <Btn
              borderRadius="18"
              alignItems={'center'}
              w="full"
              bg={'primary.400'}
              _text={{
                fontSize: '18',
                fontFamily: 'Montserrat-Semibold',
                textAlign: 'center',
              }}
              isLoading={isLoading}
              onPress={handleSubmit(handleChangePassword)}>
              Reset Password
            </Btn>
          </Box>
        </Center>
      </ScrollView>
    </>
  );
}
