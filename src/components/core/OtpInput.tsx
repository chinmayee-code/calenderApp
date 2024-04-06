import React, {useRef, useState} from 'react';
import {Input, HStack} from 'native-base';
import {TextInput} from 'react-native';

type OTPInputProps = {
  length?: number;
  disabled?: boolean;
  onChange(value: string): void;
};

export default function OtpInput({
  length,
  disabled,
  onChange,
}: OTPInputProps): JSX.Element {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [inputValues, setInputValues] = useState<string[]>(
    Array(length).fill(''),
  );
  // console.log({inputValues});
  const handleChange = (text: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
    onChange(newInputValues.join(''));
    if (text.length !== 0 && index < length - 1) {
      // Focus the next input if there is text and it's not the last input
      inputRefs.current[index + 1]?.focus();
    } else if (text.length === 0 && index > 0) {
      // Focus the previous input on backspace if it's not the first input
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <HStack w={'100%'} justifyContent={'space-between'} my={5}>
        {[...new Array(length)].map((item, index) => (
          <Input
            ref={ref => {
              if (ref && !inputRefs.current.includes(ref)) {
                inputRefs.current = [...inputRefs.current, ref];
              }
            }}
            key={index}
            maxLength={1}
            contextMenuHidden
            selectTextOnFocus
            editable={!disabled}
            value={inputValues[index]}
            testID={`OTPInput-${index}`}
            keyboardType="decimal-pad"
            fontSize={22}
            w={42}
            h={49}
            bg={'white'}
            borderRadius={12}
            color={'black'}
            textAlign={'center'}
            onChangeText={text => handleChange(text, index)}
          />
        ))}
      </HStack>
    </>
  );
}
