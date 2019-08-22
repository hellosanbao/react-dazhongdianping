const logger = ({getState,dispatch})=>(next)=>{
    return (action)=>{
        console.group(action.type);
        console.log('middleware');
        console.log('dispatch:',action);
        const result = next(action);
        console.log('next state:',getState());
        console.groupEnd();
        return result;
    }
}
export default logger;
