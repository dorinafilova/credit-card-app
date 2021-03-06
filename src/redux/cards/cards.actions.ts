import { CardsActionTypes } from "./card.types";

export const addNewCard = (card: any) => ({
  type: CardsActionTypes.ADD_NEW_CARD,
  payload: card
});

export const editExistingCard = (cardId: any) => ({
  type: CardsActionTypes.EDIT_EXISTING_CARD,
  payload: cardId
});

