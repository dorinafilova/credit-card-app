import React from 'react';
import { connect } from 'react-redux';
import CardInputForm from '../components/card-input-form/card.input.form.component';

const AddCardPage = ({ cardItem }) => <CardInputForm card={cardItem} />

const mapStateToProps = (state, ownProps) => {
    const cardId = ownProps.match?.params.cardId;
    return ({ cardItem: state.cards.cards.find(card => card.id === cardId) })
}

export default connect(mapStateToProps)(AddCardPage);
