class NotificationsHistory {
    constructor({
        id,
        type,
        title,
        message,
        created_by,
        filter,
        target_count,
        target_type,
        notification_template_id,
        NotificationTemplate
    }) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.message = message;
        this.created_by = created_by;
        this.filter = filter;
        this.target_count = target_count;
        this.target_type = target_type;
        this.notification_template_id = notification_template_id;
        this.NotificationTemplate = NotificationTemplate;
    }
}

export {
    NotificationsHistory
}