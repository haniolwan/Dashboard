class Settings {
    constructor({
        id,
        name,
        key,
        value,
        input_type
    }) {
        this.id = id;
        this.name = name;
        this.key = key;
        this.value = value;
        this.input_type = input_type;
    }
}

export {
    Settings
}