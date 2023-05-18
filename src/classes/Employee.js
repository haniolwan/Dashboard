
class Employee {
    constructor({
        id,
        name,
        email,
        mobile,
        avatar,
        Country,
        country_id,
        City,
        city_id,
        is_suspended,
        is_baned,
        Locale,
        locale_id,
        permissions,
        roles
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.avatar = avatar;
        this.Country = Country;
        this.country_id = country_id;
        this.City = City;
        this.city_id = city_id;
        this.is_suspended = is_suspended;
        this.is_baned = is_baned;
        this.Locale = Locale;
        this.locale_id = locale_id;
        this.permissions = permissions;
        this.roles = roles
    }
}

class LoginEmployee {
    constructor({ id, name, email, avatar, access_token }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.access_token = access_token;
    }
}

export {
    LoginEmployee, Employee
}