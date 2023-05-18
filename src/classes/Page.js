class Page {
    constructor({ id, key, name, description, content, image, is_active }) {
        this.id = id;
        this.key = key;
        this.name = name;
        this.description = description;
        this.content = content;
        this.image = image;
        this.is_active = is_active;
    }
}

class SelectPage {
    constructor({
        id,
        name,
        key
    }) {
        this.id = id;
        this.name = name;
        this.label = name;
        this.value = key;
    }
}

class PageTranslation {
    constructor({
        id,
        name,
        description,
        content,
        page_id,
        locale_id
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.content = content;
        this.page_id = page_id;
        this.locale_id = locale_id;
    }
}

export {
    Page, SelectPage, PageTranslation
}