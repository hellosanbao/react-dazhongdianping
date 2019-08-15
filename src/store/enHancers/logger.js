const logger = (createStore) => {
    return (...args) => {
        const store = createStore(...args);
        const dispatch = (action) => {
            console.group(action.type);
            console.log('enhancer');
            console.log('dispatch:', action);
            const result = store.dispatch(action);
            console.log('next state:', store.getState());
            console.groupEnd();
            return result;
        }
        return { ...store, dispatch }
    }
}
export default logger;