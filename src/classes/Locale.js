class Locale {
    constructor({ id, name, locale_code, is_active }) {
        this.id = id;
        this.name = name;
        this.locale_code = locale_code;
        this.is_active = is_active;
    }
}
class SelectLocale {
    constructor({ id, name }) {
        this.label = name;
        this.value = id;
    }
}

export {
    Locale, SelectLocale
}