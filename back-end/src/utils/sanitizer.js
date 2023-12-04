export function checkEmail(email) {
    return (typeof(email === 'string' && email.length <= 320)) && String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export function checkUsername(username) {
    return (typeof(username === 'string' && username.length <= 70)) && String(username)
        .toLowerCase()
        .match(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g);
};