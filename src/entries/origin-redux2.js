import { createStore } from 'Redux';

function counter(state, action) {
    if (typeof state === 'undefined') {
        return 0;
    }

    switch (action.type) {
        case 'INCREMENT':
            return state + 2;
        case 'DECREMENT':
            return state - 2;
        default:
            return state;
    }
}

const store = createStore(counter);
const valueEl = document.getElementById('value');

function render() {
    valueEl.innerHTML = store.getState().toString();
}

render();
store.subscribe(render);

document.getElementById('increment')
    .addEventListener('click', () => {
        store.dispatch({ type: 'INCREMENT' });
    });

document.getElementById('decrement')
    .addEventListener('click', () => {
        store.dispatch({ type: 'DECREMENT' });
    });

document.getElementById('incrementIfOdd')
    .addEventListener('click', () => {
        if (store.getState() % 2 !== 0) {
            store.dispatch({ type: 'INCREMENT' });
        }
    });

document.getElementById('incrementAsync')
    .addEventListener('click', () => {
        setTimeout(() => {
            store.dispatch({ type: 'INCREMENT' });
        }, 1000);
    });
