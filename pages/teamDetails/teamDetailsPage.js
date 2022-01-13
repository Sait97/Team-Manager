import {teamsDetailsTemplate} from "./teamsDetailsTemplate.js"
let _router = undefined;
let _renderHendler = undefined;
let _teamServices = undefined;
let _memberServices = undefined

function initialize(router, renderHendler, teamsServices, membersServices){
    _router = router;
    _renderHendler = renderHendler;
    _teamServices = teamsServices;
    // _memberServices = membersServices
}
async function joinHendler(teamId){
    let memberShip = {
        teamId
    }
    let result = await _memberServices.create(memberShip);
    _router.redirect(`/details/${teamId}`)

}
async function approveHendler(membershipId, teamId){
    let memberShip = {
        status: 'member'
    }
    let result = await _memberServices.update(memberShip, membershipId);
    _router.redirect(`/details/${teamId}`)

}
async function leaveHendler(membershipId, teamId){
    let modalResult =await modal.createModal('Are you sure?');

    if(modalResult){
        let result = await _memberServices.deleteItem(membershipId)
        _router.redirect(`/details/${teamId}`)
    }
  

}
async function getView(context, next){
    let teamId = context.params.teamId;
    let teamPromise = _teamServices.get(teamId)
    let allMembersShipPromise = _memberServices.getMembersShipForTeam(teamId);
    let [team, allMembersShips] = await Promise.all([teamPromise, allMembersShipPromise]);
    
    let user = context.user
    let status = undefined
    let membershipId = undefined
    if(user._id === team._ownerId){
        status = 'owner'
    }else{
        let userMemberShip = allMembersShips.find(x => x._ownerId === user._id)
        if(userMemberShip === undefined){
            status = 'nonMember';

        }else if(userMemberShip.status === 'pending'){
            membershipId = userMemberShip._id
            status = 'pending'
        }else if(userMemberShip.status === 'member'){
            membershipId = userMemberShip._id
            status = 'member'
        }
    }

    let members = allMembersShips.filter(x => x.status === 'member');
    let pendingMembersships = allMembersShips.filter(x => x.status === 'pending');

   team.userStatus = status
   team.members = members;
   team.pendingMembers = pendingMembersships;
   team.userMemberShipId = membershipId;
   team.joinHendler = joinHendler
   team.approveHendler = approveHendler;
   team.leaveHendler = leaveHendler


    let templateResult = teamsDetailsTemplate(team);
    _renderHendler(templateResult);
}

export default {
    getView,
    initialize
}