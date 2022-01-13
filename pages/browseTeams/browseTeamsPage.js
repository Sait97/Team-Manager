import { browseTeamTepmlate } from "./browseTeamsTemplate.js";

let _router = undefined;
let _renderHendler = undefined;
let _teamServices = undefined;
let _memberServices = undefined

function initialize(router, renderHendler, teamsServices, membersServices){
    _router = router;
    _renderHendler = renderHendler;
    _teamServices = teamsServices;
    _memberServices = membersServices
}

async function getView(context, next){
    let teams = await _teamServices.getAll();

    let allMembers = await _memberServices.getMembers();

    teams.forEach( t => t.membersCount = allMembers
        .filter(m => m.teamId === t._id).length)

    let viewModel = {
        teams
    }
    let templateResult = browseTeamTepmlate(viewModel);
    _renderHendler(templateResult);
}

export default {
    getView,
    initialize
}