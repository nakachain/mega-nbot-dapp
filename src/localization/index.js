import { addLocaleData } from 'react-intl'
import localeEn from 'react-intl/locale-data/en'
import localeZh from 'react-intl/locale-data/zh'
import messagesEn from './en.json'
import messagesZh from './zh.json'
import logger from '../utils/logger'
import { STORAGE_KEY } from '../config'

// Load locale data
addLocaleData([...localeEn, ...localeZh])

const DEFAULT_LANG = 'en'
const messages = {
  en: messagesEn,
  zh: messagesZh,
}
let currentLang;

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
  if (!currentLang) [currentLang] = window.navigator.language.split('-')

  // Default to English if no messages file found for the language
  if (!messages[currentLang]) {
    logger.error(`No translations found for locale: ${currentLang}. Falling back to en.`)
    currentLang = DEFAULT_LANG
  }

  // Store language
  storeLangInStorage(currentLang)
  // TODO: remove after testing
  window.messages = messages[currentLang]

  return {
    locale: currentLang,
    messages: messages[currentLang],
  }
}
