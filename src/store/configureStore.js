import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers/Reducer'
import mySaga from '../sagas/videoSagas'

export function configureStore(initialState = {}) {
    // create the saga middleware
    const sagaMiddleware = createSagaMiddleware()
    // mount it on the Store
    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    )

    // then run the saga
    sagaMiddleware.run(mySaga)
    return store;
}
