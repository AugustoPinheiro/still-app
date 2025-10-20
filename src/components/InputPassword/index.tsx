import React from 'react';
import { type TextInputProps } from 'react-native';

import { Input } from '@/components/Input';

type TInputProps = TextInputProps & {
  label?: string;
  error?: string;
  hasError?: boolean;
};

export function InputPassword({ label, error, hasError, ...props }: TInputProps) {
  const [passwordsShowPreview, setPasswordsShowPreview] = React.useState(true);

  return (
    <Input
      label={label}
      error={error}
      hasError={hasError}
      {...props}
      secureTextEntry={passwordsShowPreview}
      rightIcon={{
        name: !passwordsShowPreview ? 'eye' : 'eye-off',
        onPress: () => {
          setPasswordsShowPreview((prevState) => !prevState);
        },
      }}
    />
  );
}
