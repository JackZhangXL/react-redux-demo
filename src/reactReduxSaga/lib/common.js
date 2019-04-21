export const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
};

export const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};
