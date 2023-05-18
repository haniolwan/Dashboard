class NotificationsTemplate {
    constructor({ id, type, title, message }) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.message = message;
    }
}


class NotificationTemplateTranslation {
    constructor({
        id,
        title,
        message,
        locale_id
    }) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.locale_id = locale_id;
    }
}


export {
    NotificationsTemplate,
    NotificationTemplateTranslation
}