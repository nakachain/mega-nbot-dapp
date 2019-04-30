import { addLocaleData } from 'react-intl'
import localeEn from 'react-intl/locale-data/en'
import localeZh from 'react-intl/locale-data/zh'
import localeMessages from '../../build/locales/data.json'
import logger from '../utils/logger'
import { STORAGE_KEY } from '../config'

// Load locale data
addLocaleData([...localeEn, ...localeZh])

const DEFAULT_LANG = 'en'
let currentLang;

const getBrowserLang = () => (window.navigator.languages && window.navigator.languages[0])
  || window.navigator.language
  || window.navigator.userLanguage

const storeLangInStorage = (lang) => {
  localStorage.setItem(STORAGE_KEY.LANGUAGE, lang)
}

export const getCurrentLang = () => currentLang

export const changeLang = (lang) => {
  storeLangInStorage(lang)
  window.location.reload()
}

export default () => {
  // Determine language from storage or system
  currentLang = localStorage.getItem(STORAGE_KEY.LANGUAGE)
  if (!currentLang) [currentLang] = getBrowserLang().split('-')

  // Default to English if no messages file found for the language
  if (!localeMessages[currentLang]) {
    logger.error(`No translations found for locale: ${currentLang}. Falling back to en.`)
    currentLang = DEFAULT_LANG
  }

  // Store language
  storeLangInStorage(currentLang)
  // TODO: remove after testing
  window.messages = localeMessages

  return {
    locale: currentLang,
    messages: localeMessages[currentLang],
  }
}
