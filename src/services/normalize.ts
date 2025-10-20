import { Dimensions, PixelRatio, Platform } from 'react-native';

export const normalize = (pixelsToConvert: number): number => {
  const scale = Dimensions.get('window').width / 360;
  const newSize = pixelsToConvert * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 6;
  }
};
