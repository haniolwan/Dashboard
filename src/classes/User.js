class User {

    constructor({
        id,
        name,
        email,
        avatar,
        mobile,
        country_id,
        Country,
        city_id,
        City,
        locale_id,
        Locale,
        app_mode,
        subscription_status,
        is_verified,
        is_suspended,
        is_baned,
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.country_id = country_id;
        this.Country = Country;
        this.city_id = city_id;
        this.City = City;
        this.locale_id = locale_id;
        this.Locale = Locale;
        this.app_mode = app_mode;
        this.avatar = avatar;
        this.subscription_status = subscription_status;
        this.is_verified = is_verified;
        this.is_suspended = is_suspended;
        this.is_baned = is_baned;
    }
}

class SelectUser {
    constructor({
        id,
        name,
        email
    }) {
        this.id = id;
        this.name = name;
        this.label = name;
        this.value = email;
    }
}

export {
    User,
    SelectUser,
}