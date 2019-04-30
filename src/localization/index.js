import { addLocaleData } from 'react-intl'
import localeEn from 'react-intl/locale-data/en'
import localeZh from 'react-intl/locale-data/zh'
import messagesEn from './en.json'
import messagesZh from './zh.json'
import logger from '../utils/logger'
import { STORAGE_KEY } from '../config'

const DEFAULT_LANG = 'en'

// Load locale data
addLocaleData([...localeEn, ...localeZh])

const messages = {
  en: messagesEn,
  zh: messagesZh,
}

const loadLangFromStorage = () => {
  localStorage.getItem(STORAGE_KEY.LANGUAGE)
}

const storeLangInStorage = (lang) => {
  localStorage.setItem(STORAGE_KEY.LANGUAGE, lang)
}

export default () => {
  // Determine language from storage or system
  let lang = loadLangFromStorage()
  if (!lang) [lang] = window.navigator.language.split('-')

  // Default to English if no messages file found for the language
  if (!messages[lang]) {
    logger.error(`No translations found for locale: ${lang}. Falling back to en.`)
    lang = DEFAULT_LANG
  }

  // Store language
  storeLangInStorage(lang)

  return {
    locale: lang,
    messages: messages[lang],
  }
}
