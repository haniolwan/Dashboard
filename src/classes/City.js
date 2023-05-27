
class City {
    constructor({
        id,
        name,
        Country,
        country_id,
        is_active
    }) {
        this.id = id;
        this.name = name;
        this.Country = Country;
        this.country_id = country_id;
        this.is_active = is_active;
    }
}

class SelectCity {
    constructor({
        id,
        name,
    }) {
        this.id = id;
        this.label = name;
        this.value = id;
    }
}

class CityTranslation {
    constructor({
        id,
        name,
        city_id,
        locale_id,
        country_id,
        is_active
    }) {
        this.id = id;
        this.name = name;
        this.city_id = city_id;
        this.locale_id = locale_id;
        this.country_id = country_id;
        this.is_active = is_active;
    }
}

export {
    City,
    SelectCity,
    CityTranslation
}