class NotificationsHistory {
    constructor({
        id,
        type,
        title,
        message,
        created_by,
        filter,
        target_count,
        notifications_templates_id,
        NotificationTemplate
    }) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.message = message;
        this.created_by = created_by;
        this.filter = filter;
        this.target_count = target_count;
        this.notifications_templates_id = notifications_templates_id;
        this.NotificationTemplate = NotificationTemplate;
    }
}

export {
    NotificationsHistory
}