import { modalTemplate } from "./modalTemplate.js";


let _router = undefined;
let _renderHendler = undefined;

function initialize(router, renderHendler){
    _router = router;
    _renderHendler = renderHendler;
}

async function createModal(message){

    let model = {
        message,
      
    }
    let promise = new Promise((resolve, reject) => {
        model.hendler = (val) => {
           _renderHendler(null);
            resolve(val);

        } 
    });     
    let templateResult = modalTemplate(modal);
    _renderHendler(templateResult);


    return promise
}

export default {
    createModal,
    initialize
}