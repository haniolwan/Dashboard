class Plan {
    constructor({ id, name, type, billing_days, price, features, order_price, orders_count, is_active }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.billing_days = billing_days;
        this.price = price;
        this.features = features;
        this.order_price = order_price;
        this.orders_count = orders_count;
        this.is_active = is_active;
    }
}


class SelectPlan {
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

class PlanTranslation {
    constructor({
        id,
        name,
        plan_id,
        locale_id
    }) {
        this.id = id;
        this.name = name;
        this.plan_id = plan_id;
        this.locale_id = locale_id;
    }
}


export {
    Plan,
    SelectPlan,
    PlanTranslation
}