export const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
};

export const combineReducers = (reducers) => {
    const finalReducerKeys = Object.keys(reducers);
    return (state = {}, action) => {
        let hasChanged = false;
        const nextState = {};
        for (let i = 0; i < finalReducerKeys.length; i++) {
            const key = finalReducerKeys[i];
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
};

export const middleware1 = (store) => (dispatch) => (action) => {
    console.log('first middleware');
    dispatch(action);
};

export const middleware2 = (store) => (dispatch) => (action) => {
    console.log('second middleware');
    dispatch(action);
};

export const applyMiddleware = (...middlewares) => {
    return (createStore) => (reducer, initialState, enhancer) => {
        const store = createStore(reducer, initialState, enhancer);
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

export const compose = (...funcs) => {
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
};
