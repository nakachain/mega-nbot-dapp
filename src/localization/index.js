import { addLocaleData } from 'react-intl'
import localeEn from 'react-intl/locale-data/en'
import localeZh from 'react-intl/locale-data/zh'
import messagesEn from './en.json'
import messagesZh from './zh.json'
import logger from '../utils/logger'

// Load locale data
addLocaleData([...localeEn, ...localeZh])

const messages = {
  en: messagesEn,
  zh: messagesZh,
}

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
