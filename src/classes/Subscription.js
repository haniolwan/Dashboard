class Subscription {
    constructor({ id, name, balance, billing_days, price, order_price, orders_count, started_at, expire_at, Plan }) {
        this.id = id;
        this.name = name;
        this.billing_days = billing_days;
        this.price = price;
        this.orders_count = orders_count;
        this.balance = balance;
        this.order_price = order_price;
        this.started_at = started_at;
        this.expire_at = expire_at;
        this.Plan = Plan
    }
}


class SelectSubscription {
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
    Subscription,
    SelectSubscription,
}