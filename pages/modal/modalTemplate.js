import { html } from "./../../node_modules/lit-html/lit-html.js";

export let modalTemplate = (modal) => html`
<div class="overlay">
<div class="modal">
    <p>${modal.message}</p>
    <a href="javascript:void(0)" @click=${(e) => modal.hendler(true, e)} class="action">Accept</a>
    <a href="javascript:void(0)" @click=${(e) => modal.hendler(false, e)} class="action">Cancel</a>
</div>
</div>`;