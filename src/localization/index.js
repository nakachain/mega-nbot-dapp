import { addLocaleData } from 'react-intl'
import localeEn from 'react-intl/locale-data/en'
import localeZh from 'react-intl/locale-data/zh'
import messagesEn from './en.json'

// Load locale data
addLocaleData([...localeEn, ...localeZh])

const messages = {
  en: messagesEn,
}

export default () => {
  const language = window.navigator.language.split(/[-_]/)[0]
  return {
    locale: language,
    messages: messages[language],
  }
}
