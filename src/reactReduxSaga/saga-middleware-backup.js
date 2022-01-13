function isGenerator(fn) {
    return fn.constructor.name === 'GeneratorFunction';
}

export default function sagaMiddleware(saga) {
    if (!isGenerator(saga)) {
        throw new Error('saga必须是个generator方法');
    }

    return ({ getState, dispatch }) => (next) => (action) => {
        const result = next(action);
        const gen = saga(getState, action);

        function iterate(generator) {
            function step(arg, isError) {
                const { value: effect, done } = isError ? generator.throw(arg) : generator.next(arg);
                // retreives next action/effect
                if (!done) {
                    let response;
                    if (typeof effect === 'function') {
                        response = effect();
                    } else if (Array.isArray(effect) && typeof effect[0] === 'function') {
                        response = effect[0](...effect.slice(1));
                    } else {
                        response = dispatch(effect);
                    }

                    Promise.resolve(response).then(step, (err) => step(err, true));
                }
            }
            step();
        }

        iterate(gen);

        return result;
    };
}
