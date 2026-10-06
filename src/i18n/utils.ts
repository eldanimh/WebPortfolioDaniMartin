import { ui, defaultLang } from "./ui";

// Mira la URL y devuelve el idioma: "/en/..." → "en", cualquier otra → "es"
export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split("/");
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

// Devuelve una función t() que traduce claves al idioma indicado
export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof (typeof ui)[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    };
}
