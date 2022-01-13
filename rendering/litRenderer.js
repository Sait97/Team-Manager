import {render} from "./../node_modules/lit-html/lit-html.js"
export class LitRenderer{
    constructor(){}

    createRednderHendler(domElement){
        return function(templateResult){
            render(templateResult, domElement);
        }
    }
}