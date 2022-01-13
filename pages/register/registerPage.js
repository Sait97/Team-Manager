import { registerTemplate } from "./registerTemplate.js";

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
        username: formData.get('username'),
        password: formData.get('password')
    }

    let registerResult = await _authService.register(user);
     _router.redirect('/home');
}

async function getView(context) {
    let form = {
        submitHandler,
    }
    let templateResult = registerTemplate(form);
    _renderHendler(templateResult);
}

export default {
    getView,
    initialize
}