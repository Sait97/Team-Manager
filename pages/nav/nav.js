
import { navTemplate } from "./navTemplate.js";


let _router = undefined;
let _renderHendler = undefined;
let _authService = undefined

function initialize(router, renderHendler, authService){
    _router = router;
    _renderHendler = renderHendler;
    _authService = authService;
    
}

async function logoutHendler(e){
    await _authService.logout();
    _router.redirect('/login')
}

async function getView(context, next){
    let user = context.user; 
    let viewModel = {
        isLoggedIn: user !== undefined,
        logoutHendler
    }
    let templateResult = navTemplate(viewModel);
    _renderHendler(templateResult);
    next();
}

export default {
    getView,
    initialize
}