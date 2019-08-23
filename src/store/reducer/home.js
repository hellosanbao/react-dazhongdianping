
export default (state={},action)=>{
    switch(action.type){
        case 'HOME':
            const newState = {mhList:action.mhList}
            return {...state,...newState}
        default:
            return {...state}
    }
}