// Step1 ~ Step2 见 originReduxCombineReducer.js

// Step3
// 只打印出 Action
export const loggerAction = (store) => (dispatch) => (action) => {
    console.log('action: ', action);
    dispatch(action);
};

// 只打印出 更新后的state
export const loggerState = (store) => (dispatch) => (action) => {
    console.log('current state: ', store.getState());
    dispatch(action);
    console.log('next state', store.getState());
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
