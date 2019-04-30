import { addLocaleData } from 'react-intl'
import localeEn from 'react-intl/locale-data/en'
import localeZh from 'react-intl/locale-data/zh'
import messagesEn from './en.json'
import messagesZh from './zh.json'
import logger from '../utils/logger'
import { STORAGE_KEY } from '../config'

// Load locale data
addLocaleData([...localeEn, ...localeZh])

const messages = {
  en: messagesEn,
  zh: messagesZh,
}

// const loadLangFromStorage = () => {
//   const storedNetwork = localStorage.getItem(KEY_SELECTED_NETWORK)
//   if (storedNetwork) this.selectedNetwork = storedNetwork
//   else localStorage.setItem(KEY_SELECTED_NETWORK, this.selectedNetwork)
// }

export default () => {
  let lang = window.navigator.language.split(/[-_]/)[0]

  // Default to English if no messages file found for the language
  if (!messages[lang]) {
    logger.error(`No translations found for locale: ${lang}`)
    lang = 'en'
  }

  return {
    locale: lang,
    messages: messages[lang],
  }
}
