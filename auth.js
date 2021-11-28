const doLogin = (email, password) => {
    const knownUser = localStorage.getItem(`${LS_EMAIL_PREFIX}${email}`);
    if (!knownUser) {
        displayErrors(["No user with this email was found."]);
        return;
    }

    const userInfo = JSON.parse(knownUser);
    if (userInfo.password !== password) {
        displayErrors(["No user with this password was found."]);
        return;
    }
    localStorage.setItem(LS_CURRENT_USER_EMAIL, email);
    window.location = '/tickets.html';
}

const doRegister = (name, email, password) => {
    const knownUser = localStorage.getItem(`${LS_EMAIL_PREFIX}${email}`);
    if (knownUser) {
        displayErrors(["An account with this email already exists."]);
        return;
    }
    localStorage.setItem(`${LS_EMAIL_PREFIX}${email}`, JSON.stringify({
        name,
        password,
        tickets: [],
    }));
    window.location = '/tickets.html';
}

const viewLogin = () => {
    render('login', 'app', {});
    document.getElementById('switch-to-register').onclick = viewRegister
    document.getElementById('login').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        doLogin(email, password)
    }
}

const viewRegister = () => {
    render('register', 'app', {});
    document.getElementById('switch-to-login').onclick = viewLogin
    document.getElementById('register').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        doRegister(name, email, password)
    }
}
