import { Colors } from './types'

export const baseColors = {
  failure: '#d40749',
  primary: '#CCA93F',
  primaryBright: '#53DEE9',
  primaryDark: '#0098A1',
  secondary: '#0676f9',
  success: '#756F7C',
  warning: '#FFB237',
}

export const additionalColors = {
  binance: '#F0B90B',
  overlay: '#452a7a',
  gold: '#FFC700',
  silver: '#B2B2B2',
  bronze: '#E7974D',
}

export const lightColors: Colors = {
  ...baseColors,
  ...additionalColors,
  background: '#FAF9FA',
  backgroundDisabled: '#E9EAEB',
  backgroundAlt: '#9B6F47',
  backgroundAlt2: 'rgba(255, 255, 255, 0.7)',
  cardBorder: '#11161b',
  contrast: '#131826',
  dropdown: '#F6F6F6',
  dropdownDeep: '#EEEEEE',
  invertedContrast: '#FFFFFF',
  input: '#eeeaf4',
  inputSecondary: '#d7caec',
  tertiary: '#EFF4F5',
  text: '#fff',
  textDisabled: '#BDC2C4',
  textSubtle: 'white',
  disabled: '#E9EAEB',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #9B6F47 0%, #F6FEFF 100%)',
    inverseBubblegum: 'linear-gradient(139.73deg, #F6FEFF 0%, #9B6F47 100%)',
    cardHeader: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
    blue: 'linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)',
    violet: 'linear-gradient(180deg, #D4F8FC 0%, #C6E3FC 100%)',
    violetAlt: 'linear-gradient(180deg, #CBD7EF 0%, #9EA6FB 100%)',
    gold: 'linear-gradient(180deg, red 0%, #FDAB32 100%)',
  },
}

export const darkColors: Colors = {
  ...baseColors,
  ...additionalColors,
  secondary: '#FFFFFF',
  background: '#000000',
  backgroundDisabled: '#3c3742',
  backgroundAlt: 'linear-gradient(45deg, #3E1B0C, #3E1B0C)',
  backgroundAlt2: 'rgba(39, 38, 44, 0.7)',
  cardBorder: 'none',
  contrast: '#FFFFFF',
  dropdown: '#1E1D20',
  dropdownDeep: '#100C18',
  invertedContrast: '#131826',
  input: '#201A26',
  inputSecondary: 'none',
  primaryDark: '#0098A1',
  tertiary: '#6A2214',
  text: '#F4EEFF',
  textDisabled: '#666171',
  textSubtle: '#FFFFFF',
  disabled: '#524B63',
  gradients: {
    bubblegum: '#EDF6FF',
    inverseBubblegum: 'linear-gradient(139.73deg, #2a3b54 0%, #313D5C 100%)',
    cardHeader: '#9B6F47',
    blue: 'linear-gradient(180deg, #00707F 0%, #19778C 100%)',
    violet: 'linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)',
    violetAlt: 'linear-gradient(180deg, #434575 0%, #66578D 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
  },
}
