import { homeTemplate } from './homeTemplate.js'

let _router = undefined;
let _renderHendler = undefined;

function initialize(router, renderHendler){
    _router = router;
    _renderHendler = renderHendler;
}

async function getView(context, next){
    let viewModel = {
        isLoggedIn: context.user !== undefined
    }
    let templateResult = homeTemplate(viewModel);
    _renderHendler(templateResult);
}

export default {
    getView,
    initialize
}