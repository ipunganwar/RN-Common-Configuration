import { Dimensions, Platform, PixelRatio } from 'react-native';
// Precalculate Device Dimensions for better performance
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height + 10;

export {
  width,
  height
}
export function normalizeFont(size) {
  // return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
  return Math.round(PixelRatio.roundToNearestPixel(size))
}

export function fontPlatform(OS, fontType) {
  switch (fontType) {
    case 'Regular' :
      return OS === 'ios' ? 'Raleway' : 'raleway_regular'
      break;

    case 'Bold' :
      return OS === 'ios' ? 'Raleway-Bold' : 'raleway_bold'
      break;

    case 'Medium' :
      return OS === 'ios' ? 'Raleway-Medium' : 'raleway_medium'
      break;

    case 'ExtraLight' :
      return OS === 'ios' ? 'Raleway-ExtraLight' : 'raleway_extraLight'
      break;

    case 'Light' :
      return OS === 'ios' ? 'Raleway-Light' : 'raleway_light'
      break;

    case 'SemiBold' :
      return OS === 'ios' ? 'Raleway-SemiBold' : 'raleway_semiBold'
      break;

    case 'Futura Medium' :
      return OS === 'ios' ? 'Raleway-Regular' : 'futuraPT_medium'
      break;

    case 'LightItalic' :
      return OS === 'ios' ? 'Raleway-Light-Italic' : 'raleway_lightItalic'
      break;

  }
}

export function modalStyle(OS) {
  if (OS === 'android') {
    return 'overCurrentContext'
  } else {
    return 'formSheet'
  }
}
