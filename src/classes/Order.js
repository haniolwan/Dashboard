class Order {

    constructor({
        id,
        date,
        time,
        address,
        latitude,
        longitude,
        name,
        mobile,
        status,
        rate,
        review,
        service_id,
        Service,
        user_id,
        User,
        provider_id,
        Provider,
    }) {
        this.id = id;
        this.name = name;
        this.mobile = mobile;
        this.user_id = user_id;
        this.User = User;
        this.provider_id = provider_id;
        this.Provider = Provider;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.rate = rate;
        this.Service = Service;
        this.service_id = service_id;
        this.date = date;
        this.time = time;
        this.status = status;
        this.review = review;
    }
}

class SelectOrder {
    constructor({
        id,
        name,
    }) {
        this.id = id;
        this.label = name;
        this.value = id;
    }
}

export {
    Order,
    SelectOrder,
}
