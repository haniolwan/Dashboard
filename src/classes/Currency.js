class Currency {
    constructor({ id, name, code, symbol, is_active }) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.symbol = symbol;
        this.is_active = is_active;
    }
}

class SelectCurrency {
    constructor({
        id, name, code
    }) {
        this.id = id;
        this.label = name;
        this.value = code;
    }
}

class CurrencyTranslation {
    constructor({ id, name, currency_id, locale_id }) {
        this.id = id;
        this.name = name;
        this.currency_id = currency_id;
        this.locale_id = locale_id;
    }
}

export {
    Currency,
    SelectCurrency,
    CurrencyTranslation
}
