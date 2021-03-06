import { CardsActionTypes } from "./card.types";

const initialState = {
  cards: [],
};

const cardsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CardsActionTypes.ADD_NEW_CARD:
      return reduceAddCard(state, action);
    case CardsActionTypes.EDIT_EXISTING_CARD:
      return reduceEditCard(state, action);
    default:
      return state;
  }
};

const reduceAddCard = (state, action) => {
  const addedItem = action.payload;
  const currentCardItems = state.cards;

  return {
    ...state,
    cards: [...currentCardItems, { ...addedItem }],
  };
};

const reduceEditCard = (state, action) => {
  const itemToEdit = action.payload;
  const currentCardItems = state.cards;

  const cardItems = currentCardItems.map(currentCardItem=>{
    if(currentCardItem.id === itemToEdit.id){
      return itemToEdit;
    }
    return currentCardItem;
  });

  return {
    ...state,
    cards: cardItems,
  };
};

export default cardsReducer;
