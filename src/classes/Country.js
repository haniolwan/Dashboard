
class Country {
    constructor({ id, name, code, flag, currency_id, locale_id, Currency, Locale, is_active }) {
        this.id = id;
        this.name = name;
        this.value = code;
        this.flag = flag;
        this.code = code;
        this.Currency = Currency;
        this.currency_id = currency_id;
        this.Locale = Locale;
        this.locale_id = locale_id;
        this.is_active = is_active;
    }
}

class SelectCountry {
    constructor({ id, name }) {
        this.id = id;
        this.label = name;
        this.value = id;
    }
}


class CountryTranslation {
    constructor({
        id,
        name,
        country_id,
        locale_id
    }) {
        this.id = id;
        this.name = name;
        this.country_id = country_id;
        this.locale_id = locale_id;
    }
}



export {
    Country,
    SelectCountry,
    CountryTranslation
};
