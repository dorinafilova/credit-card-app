import cardsReducer from './cards/cards.reducer'
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cards'] 
}

const rootReducer = combineReducers({
    cards: cardsReducer
});

export default persistReducer(persistConfig, rootReducer);
