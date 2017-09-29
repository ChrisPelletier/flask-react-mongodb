export default {
    jwt: localStorage.getItem('jwt') || null,
    user: {
        fetchingUser: false,
        fetchUserError: {}
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