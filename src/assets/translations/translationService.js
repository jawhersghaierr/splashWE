import translations from "./index";

const defaultLocale = "fr-FR";

export function translation(locale = defaultLocale) {
    if (!translations[locale]) {
        console.error("Missing translations for language: " + locale);
        return translations[defaultLocale];
    }

    return translations[locale];
}

export default translation;
