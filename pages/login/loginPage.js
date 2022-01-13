
import { loginTemplate } from "./loginTemplate.js";

let _router = undefined;
let _renderHendler = undefined;
let _authService = undefined


function initialize(router, renderHendler, authService){
    _router = router;
    _renderHendler = renderHendler;
    _authService = authService
    
}

async function submitHandler(e){
    e.preventDefault();
    let formData = new FormData(e.target);

    let user = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    let loginResult = await _authService.login(user);
    _router.redirect('/home');
}

async function getView(context) {
    let form = {
        submitHandler,
    }
    let templateResult = loginTemplate(form);
    _renderHendler(templateResult);
}

export default {
    getView,
    initialize
}