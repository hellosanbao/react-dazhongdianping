import request from '../../utils/request'
const requestMh = (list)=>{
    return {
        type:'HOME',
        mhList:list
    }
}

export const fetchMhData = (query) =>{
    return async (dispatch) =>{
        let res = await request({mhname:query})
        dispatch(requestMh(res.data.list))
    }
}