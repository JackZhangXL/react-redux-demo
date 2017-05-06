import { createStore } from 'Redux';
import * as constant from '../configs/action';
import * as action from '../actions/number';
import './originRedux.pcss';

function counter(state, action) {
    if (typeof state === 'undefined') {
        return 0;
    }

    switch (action.type) {
        case constant.INCREMENT:
            return state + 1;
        case constant.DECREMENT:
            return state - 1;
        case constant.CLEAR_NUM:
            return 0;
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
        store.dispatch(action.incrementNum());
    });

document.getElementById('decrement')
    .addEventListener('click', () => {
        store.dispatch(action.decrementNum());
    });

document.getElementById('clear')
    .addEventListener('click', () => {
        if (store.getState() !== 0) {
            store.dispatch(action.clearNum());
        }
    });

document.getElementById('incrementAsync')
    .addEventListener('click', () => {
        setTimeout(() => {
            store.dispatch({ type: constant.INCREMENT });
        }, 1000);
    });
