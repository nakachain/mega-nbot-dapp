# MegaNBOT Dapp

## Deploy

1. Pull the branch you want to deploy
2. `npm i`
3. `./deploy.sh`

## Localization

### Extract strings
Running the extract script will find all the messages used by React-Intl in all React components. In order to have them detected/extracted, all `FormattedMessage` and `defineMessages` need to have `id` and `defaultMessage`. To extract strings into `/build/messages`, run:

```bash
npm run build:messages
```

### Merge strings into single JSON
After extracting the strings, you will need to merge all of the strings from `/build/messages` to a single JSON file `/build/locales/data.json`. To merge all the strings, run:

```bash
npm run build:merge
```

### Translate
After merging all the extracted strings into `/build/locales/data.json`, you can now add the translated strings for other locales. Translations for the `en` strings in `data.json` should be placed in other files. For example, for Chinese translations, you would have a separate `/build/locales/zh.json`. 

### Merge translated strings into single JSON
After translating the strings, you will need to run the merge script again to merge all the translations in `/build/locales` into `/build/locales/data.json`. To merge all the translations, run: 

```bash
npm run build:merge
```
