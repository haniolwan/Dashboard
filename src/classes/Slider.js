class Slider {
    constructor({ id, name, image, is_active, url }) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.url = url;
        this.is_active = is_active;
    }
}

class SelectSlider {
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

class SliderTranslation {
    constructor({
        id,
        name,
        image,
        locale_id,
        slider_id
    }) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.locale_id = locale_id;
        this.slider_id = slider_id;
    }
}

export {
    Slider,
    SelectSlider,
    SliderTranslation
}