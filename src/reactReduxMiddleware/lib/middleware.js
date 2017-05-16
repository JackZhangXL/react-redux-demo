export const logger1 = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

export const logger2 = store => next => action => {
    console.log('dispatching again', action);
    let result = next(action);
    console.log('next state again', store.getState());
    return result;
};
