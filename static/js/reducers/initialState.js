export default {
    jwt: localStorage.getItem('jwt') || null,
    user: {
        fetchingUser: false,
        fetchUserError: '',
        user: JSON.parse(localStorage.getItem('user')) || {}
    },
    login: {
        email: '',
        password: '',
        loginError: '',
        emailError: '',
        passwordError: ''
    },
    register: {
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        retypePassword: '',
        retypePasswordError: '',
        matchingPasswordError: '',
        registerError: ''
    },
    header: {
        menuIsOpen: false
    }
};