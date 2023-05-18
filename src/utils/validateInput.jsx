const validateInput = (name, input) => {
    let isValid = true;
    switch (name) {
        case 'username':
            const validUsername = "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$";
            if (!input.match(validUsername) || input.length < 5) {
                isValid = false;
            }
            break;
        case 'email':
            let emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
            if (!emailValid) {
                isValid = false;
            }
            break;
        case 'password':
            const validPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if (input.match(validPassword) || input.length < 5) {
                isValid = false;
            }
            break;
        default:
    }
    return isValid
}

export default validateInput;