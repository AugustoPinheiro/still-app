import React from 'react';
import { View } from 'react-native';

// import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
// import { useTheme } from 'styled-components/native';

// const levels = [
//   {
//     label: 'Extremamente fraco',
//     labelColor: '#ff3e00',
//     activeBarColor: '#ff3e00',
//   },
//   {
//     label: 'Muito fraco',
//     labelColor: '#ff5400',
//     activeBarColor: '#ff5400',
//   },
//   {
//     label: 'Fraco',
//     labelColor: '#ff6900',
//     activeBarColor: '#ff6900',
//   },
//   {
//     label: 'Mais ou menos',
//     labelColor: '#f4d744',
//     activeBarColor: '#f4d744',
//   },
//   {
//     label: 'Média',
//     labelColor: '#f3d331',
//     activeBarColor: '#f3d331',
//   },
//   {
//     label: 'Justo',
//     labelColor: '#f2cf1f',
//     activeBarColor: '#f2cf1f',
//   },
//   {
//     label: 'Forte',
//     labelColor: '#14eb6e',
//     activeBarColor: '#14eb6e',
//   },
//   {
//     label: 'Muito forte',
//     labelColor: '#0af56d',
//     activeBarColor: '#0af56d',
//   },
//   {
//     label: 'Incrivelmente forte',
//     labelColor: '#00ff6b',
//     activeBarColor: '#00ff6b',
//   },
// ];

interface TBarPasswordStrengthProps {
  password: string;
}

export function BarPasswordStrength({ password }: TBarPasswordStrengthProps) {
  // return (
  //   <BarPasswordStrengthDisplay
  //     password={password}
  //     wrapperStyle={{ alignItems: 'flex-start' }}
  //     width={345}
  //     levels={levels}
  //     labelStyle={{ fontFamily: theme?.fonts.REGULAR_ITALIC, fontSize: 10 }}
  //   />
  // );

  return <View />;
}
