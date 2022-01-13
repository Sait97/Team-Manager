
import page from "./node_modules/page/page.mjs";
import browseTeamsPage from "./pages/browseTeams/browseTeamsPage.js";
import teamDetailsPage from "./pages/teamDetails/teamDetailsPage.js"
import homePage from "./pages/home/homePage.js";
import loginPage from "./pages/login/loginPage.js";
import nav from "./pages/nav/nav.js";
import registerPage from "./pages/register/registerPage.js";
import { LitRenderer } from "./rendering/litRenderer.js";
import authService from "./services/authService.js";
import membersServices from "./services/membersServices.js";
import teamsService from "./services/teamsService.js";
import modal from "./pages/modal/modal.js";

let appElement = document.getElementById('app');
let navElement = document.getElementById('titlebar');
let modalElement = document.getElementById('modal');

let litRenderer = new LitRenderer();

let navRenderHendler = litRenderer.createRednderHendler(navElement);
let appRenderHendler = litRenderer.createRednderHendler(appElement);
let modelRenderHendler = litRenderer.createRednderHendler(modalElement);
nav.initialize(page, navRenderHendler, authService);
homePage.initialize(page, appRenderHendler);
loginPage.initialize(page, appRenderHendler, authService);
registerPage.initialize(page, appRenderHendler, authService)
browseTeamsPage.initialize(page, appRenderHendler, teamsService, membersServices)
teamDetailsPage.initialize(page, appRenderHendler, teamsService, membersServices)

modal.initialize(page, modelRenderHendler);

page(decorateUser)
page(nav.getView);

page('/', '/home');
page('/index.html', '/home');


page('/home', homePage.getView);
page('/login', loginPage.getView);
page('/register', registerPage.getView);
page('/browse-teams', browseTeamsPage.getView);
page('/details/:teamId', teamDetailsPage.getView);
page.start();

function decorateUser(context, next){
    let user = authService.getUser();
    context.user = user;
    next();
}