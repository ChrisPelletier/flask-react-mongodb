import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';

let items =[
    {
        state: "home",
        label: "Home",
        path: "/",
        component: HomePage,
        exact: true,
        showInHeader: true
    },
    {
        state: "about",
        label: "About",
        path: "/about",
        component: AboutPage,
        requiresAuthentication: true,
        exact: true,
        showInHeader: true
    }
];

export default items;