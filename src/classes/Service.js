class Service {
    constructor({ id, name, image, description, orders, workers, is_active }) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.is_active = is_active;
        this.orders = orders;
        this.workers = workers;
    }
}
class SelectService {
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

class ServiceTranslation {
    constructor({ id, name, description, service_id, locale_id }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.service_id = service_id;
        this.locale_id = locale_id;
    }
}

export {
    Service,
    SelectService,
    ServiceTranslation
}