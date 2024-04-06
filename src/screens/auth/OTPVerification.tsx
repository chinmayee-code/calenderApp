import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Center,
  ScrollView,
  useColorModeValue,
  Link,
  Text,
  VStack,
  useToast,
  HStack,
  Spinner,
  Pressable,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import {Btn, AppIcon} from '~/components/core';

import AnimatedLottieView from 'lottie-react-native';
import {ANIMATIONS} from '~/assets';
import useMutation from '~/hooks/useMutation';
import {PublicRouteProps, PublicRoutesTypes} from '~/routes/public/types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import OtpInput from '~/components/core/OtpInput';
import {HEIGHT} from '~/styles';

type Props = NativeStackScreenProps<PublicRoutesTypes, 'OTPVerification'>;
export default function OTPVerification({route: {params}}: Props): JSX.Element {
  console.log('====', params);
  const [username, setUsername] = useState(params?.username);
  useEffect(() => {
    setUsername(params?.username);
  }, [params]);

  const {navigate, goBack} = useNavigation<PublicRouteProps>();

  const [otpValue, setOtpValue] = React.useState<string[]>([]);
  const {mutation: resendOtp, isLoading: isResendOtpLoading} = useMutation();
  const toast = useToast();
  const color = useColorModeValue('white', 'dark.50');
  const bg = useColorModeValue('black', 'white');
  const bg4 = useColorModeValue('white', 'black');
  const screenWidth = Dimensions.get('window').width;
  const {mutation: OtpVerify, isLoading} = useMutation();

  const handleOtpChange = (newValue: string[]) => {
    setOtpValue(newValue);
  };

  const handleOtp = async (otpValue: any) => {
    try {
      const res = await OtpVerify(`user/forget-password?action=checkOtp`, {
        body: {
          email: username,
          otp: otpValue,
        },
      });
      console.log('resss', res);
      if (res?.status === 200) {
        toast.show({
          title: res?.results?.message,
          duration: 3000,
          bg: 'success.400',
        });
        navigate('ResetPassword', {username, otpValue});
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
  const handleSend = async () => {
    try {
      const res = await resendOtp(`user/forget-password?action=sendOtp`, {
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
        // navigate('OTPVerification', {username});
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} flex={1} bg={color}>
        <Pressable p={5} pb={0} onPress={() => goBack()}>
          <AppIcon
            IoniconsName={'arrow-back-circle-outline'}
            size={32}
            color={'black'}
          />
        </Pressable>
        <Center
          h={HEIGHT}
          flexGrow={1}
          px={screenWidth * 0.04}
          py={screenWidth * 0.05}
          w="full">
          <Box
            size={'200'}
            bg={'lightBlue.50'}
            justifyContent={'center'}
            borderRadius={'full'}>
            <Box size={'150'} alignSelf={'center'}>
              <AnimatedLottieView
                source={ANIMATIONS.lock}
                autoPlay
                loop={true}
              />
            </Box>
          </Box>
          <VStack space={1} mt={4} alignItems={'center'}>
            <Text
              fontSize="24"
              fontFamily={'Montserrat-Bold'}
              color={'primary.400'}>
              Account Verification
            </Text>
            <Text color={bg} fontFamily={'Montserrat-Regular'}>
              Please enter 6-digit code sent to
            </Text>
            <Text fontFamily={'Montserrat-Semibold'} color={bg}>
              user@gmail.com
            </Text>
          </VStack>
          <OtpInput
            length={6}
            disabled={false}
            value={otpValue}
            onChange={handleOtpChange}
          />
          <Text color={bg} fontSize="16" fontWeight="400" mr="2">
            Otp will be automatically updated after 5:00 min
          </Text>
          <Box alignItems="center" flexDirection="row" mt={4}>
            <Text color={bg} fontSize="16" fontWeight="400" mr="2">
              You have receive the code?
            </Text>
            <Link onPress={handleSend} isUnderlined={true}>
              <Text color={bg} fontSize="16" fontFamily={'Montserrat-Semibold'}>
                Resend!
              </Text>
            </Link>
          </Box>
          <Box w={'full'} my={3}>
            <Btn
              borderRadius="18"
              alignItems={'center'}
              w="full"
              bg={'primary.400'}
              _text={{
                color: bg4,
                fontSize: '18',
                fontFamily: 'Montserrat-Semibold',
                textAlign: 'center',
              }}
              onPress={() => handleOtp(otpValue)}
              icon={{FontAwesome5Name: isLoading ? '' : 'check-circle'}}>
              {isLoading ? (
                <HStack space={2}>
                  <Spinner alignSelf={'center'} size={'sm'} color={'white'} />
                  <Text
                    color="white"
                    fontSize="18"
                    fontFamily={'Montserrat-Semibold'}
                    textAlign={'center'}>
                    Loading...
                  </Text>
                </HStack>
              ) : (
                'Verify'
              )}
            </Btn>
          </Box>
        </Center>
      </ScrollView>
    </>
  );
}
