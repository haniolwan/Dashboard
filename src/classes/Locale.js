class Locale {
    constructor({ id, name, locale }) {
        this.id = id;
        this.name = name;
        this.locale = locale;
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