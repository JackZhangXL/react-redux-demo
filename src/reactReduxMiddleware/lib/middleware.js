// Step1
// const preDispatch = store.dispatch;
// store.dispatch = (action) => {
//     console.log('dispatching', action);
//     const result = preDispatch(action);
//     console.log('next state', store.getState());
//     return result;
// };


// Step2
// // 只打印出 Action
// export const loggerAction = (store) => {
//     const preDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         console.log('dispatching', action);
//         const result = preDispatch(action);
//         return result;
//     };
// };
//
// // 只打印出 更新后的state
// export const loggerState = (store) => {
//     const preDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         const result = preDispatch(action);
//         console.log('next state', store.getState());
//         return result;
//     };
// };

// Step3
// 只打印出 Action
export const loggerAction = (store) => (dispatch) => (action) => {
    console.log('dispatching', action);
    const result = dispatch(action);
    return result;
};

// 只打印出 更新后的state
export const loggerState = (store) => (dispatch) => (action) => {
    const result = dispatch(action);
    console.log('next state', store.getState());
    return result;
};

// export const applyMiddleware = (store, middlewares) => {
//     let dispatch = store.dispatch;
//     middlewares.forEach((middleware) => {
//         dispatch = middleware(store)(dispatch);
//     });
//
//     return {
//         ...store,
//         dispatch,
//     };
// };

// final Step
export const applyMiddleware = (...middlewares) => {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        const store = createStore(reducer, preloadedState, enhancer);

        let dispatch = store.dispatch;
        middlewares.forEach((middleware) => {
            dispatch = middleware(store)(dispatch);
        });

        return {
            ...store,
            dispatch,
        };
    };
};
