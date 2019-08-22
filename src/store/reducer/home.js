
export default (state='',action)=>{
    switch(action.type){
        case 'HOME':
            return action.text
        default:
            return ''
    }
}