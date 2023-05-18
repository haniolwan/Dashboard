class Provider {
    constructor({
        id,
        name,
        mobile,
        country_id,
        Country,
        city_id,
        City,
        locale_id,
        Locale,
        app_mode,
        hourly_rate,
        avatar,
        latitude,
        longitude,
        type,
        is_verified,
        is_available,
        is_suspended,
        is_baned }) {
        this.id = id;
        this.name = name;
        this.mobile = mobile;
        this.country_id = country_id;
        this.Country = Country;
        this.city_id = city_id;
        this.City = City;
        this.locale_id = locale_id;
        this.Locale = Locale;
        this.app_mode = app_mode;
        this.hourly_rate = hourly_rate;
        this.avatar = avatar;
        this.latitude = latitude;
        this.longitude = longitude;
        this.type = type;
        this.is_verified = is_verified;
        this.is_available = is_available;
        this.is_suspended = is_suspended;
        this.is_baned = is_baned;
    }
}


class SelectProvider {
    constructor({
        id,
        name,
    }) {
        this.id = id;
        this.name = name;
        this.label = name;
        this.value = id;
    }
}

export {
    Provider,
    SelectProvider,
}

