import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Center,
  IInputProps,
  Image,
  ScrollView,
  useToast,
} from 'native-base';
import React, {useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {useWindowDimensions} from 'react-native';
import {IMAGES} from '~/assets';
import {AppInput, Btn} from '~/components/core';
import {IconProps} from '~/components/core/AppIcon';
import useMutation from '~/hooks/useMutation';
import {PublicRouteProps} from '~/routes/public/types';

type FormInput = {
  key: string;
  label: string;
  placeholder: string;
  icon: IconProps;
  rules: Object;
  inputProps?: IInputProps;
};

type FormData = {
  [key: string]: string;
};

export default function ForgotPassword(): JSX.Element {
  const toast = useToast();
  const {mutation: forgotPassword, isLoading: isForgotPasswordLoading} =
    useMutation();
  const {navigate, goBack} = useNavigation<PublicRouteProps>();
  const {height} = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const handleSend = async ({username}: FormData) => {
    try {
      const res = await forgotPassword(`user/forget-password?action=sendOtp`, {
        body: {
          email: username,
        },
      });

      // console.log('===>', res);

      if (res?.results?.success) {
        toast.show({
          title: res?.results?.message,
          duration: 5000,
        });
        navigate('OTPVerification', {username});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formInputs: FormInput[] = useMemo(
    () => [
      {
        key: 'username',
        label: 'Email',
        placeholder: 'Enter registration email address',
        icon: {FeatherName: 'mail'},
        rules: {
          required: 'Email address is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        },
        inputProps: {keyboardType: 'email-address', autoCapitalize: 'none'},
      },
    ],
    [],
  );

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} bg="white">
        <Center h={height} px="4">
          <Image
            source={IMAGES.LOGO}
            resizeMode={'contain'}
            w={'full'}
            h="20"
            alt="Logo"
            my="2"
          />
          {formInputs.map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
            />
          ))}
          <Box w="full">
            <Btn
              colors={['#fff', '#fff']}
              _text={{color: 'black', fontSize: 'sm'}}
              alignSelf={'flex-end'}
              onPress={() => navigate('ResetPassword')}>
              Go Back
            </Btn>
          </Box>
          <Btn
            colors={['primary.500', 'lightBlue.600']}
            onPress={handleSubmit(handleSend)}
            isLoading={isForgotPasswordLoading}
            my="4"
            icon={{FeatherName: 'send'}}>
            Send Password Reset Link
          </Btn>
        </Center>
      </ScrollView>
    </>
  );
}
