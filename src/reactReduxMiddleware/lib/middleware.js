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
export const loggerAction = (store) => (preDispatch) => (action) => {
    console.log('dispatching', action);
    const result = preDispatch(action);
    return result;
};

// 只打印出 更新后的state
export const loggerState = (store) => (preDispatch) => (action) => {
    const result = preDispatch(action);
    console.log('next state', store.getState());
    return result;
};

export const useApplyMiddleware = (store, middlewares) => {
    let dispatch = store.dispatch;
    middlewares.forEach((middleware) => {
        dispatch = middleware(store)(dispatch);
    });

    return {
        ...store,
        dispatch,
    };
};
