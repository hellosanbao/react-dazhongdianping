import request from '../../utils/request'
export const requestMh = (data)=>{
    return {
        type:'HOME',
        data
    }
}

export const fetchMhData = (query) =>{
    return async (dispatch) =>{
        let data = await request({mhname:query})
        return dispatch(requestMh(data))
    }
}