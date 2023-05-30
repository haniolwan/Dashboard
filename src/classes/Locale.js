class Locale {
    constructor({ id, name, locale_code, is_active }) {
        this.id = id;
        this.name = name;
        this.locale_code = locale_code;
        this.is_active = is_active;
    }
}
class SelectLocale {
    constructor({ id, name, locale }) {
        this.id = id;
        this.label = name;
        this.value = locale;
    }
}

export {
    Locale, SelectLocale
}