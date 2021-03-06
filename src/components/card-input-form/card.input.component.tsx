import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import { connect } from 'react-redux';
import { addNewCard, editExistingCard } from '../../redux/cards/cards.actions';
import { CardType } from '../../utils';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import validator from 'validator';

import 'react-credit-cards/lib/styles.scss';
import './card.input.styles.scss';

type PropsType = RouteComponentProps & {
    addNewCard: (card: CardType) => void;
    editExistingCard: (card: CardType) => void;
    cards: CardType[];
    card: CardType;
}

const CardInputForm: React.FC<PropsType> = props => {
    const existingCardName = props.card && props.card.name;
    const existingCardNumber = props.card && props.card.number;
    const existingCardExpiry = props.card && props.card.expiry;

    const [name, setName] = useState(existingCardName || '');
    const [number, setNumber] = useState(existingCardNumber || '');
    const [focus, setFocus] = useState('');
    const [expiry, setExpiry] = useState(existingCardExpiry || '');
    const [errorNumber, setErrorNumber] = useState('');
    const [errorExpiry, setErrorExpiry] = useState('');

    const handleInputFocus = (e) => setFocus(e.target.name)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'number') {
            validateCreditCard(value);
        }
        else if (name === 'expiry') {
            validateExpiryDate(value);
        }
        else {
            setName(e.target.value);
        }

    }

    const onClick = (e) => {
        e.preventDefault();

        const { cards, addNewCard, editExistingCard, card, history } = props;

        const cardObj: CardType = {
            id: card ? card.id : `card-${cards.length + 1}`,
            name,
            number,
            expiry
        }

        const action = card ? editExistingCard : addNewCard
        action(cardObj);
        history.push('/cards');

    };

    const validateCreditCard = value => {
        if (!validator.isCreditCard(value)) {
            setErrorNumber('Wrong card number');
        }
        else {
            setErrorNumber('');
        }
        setNumber(value);
    }

    const validateExpiryDate = value => {
        const month = value.substring(0, 2);
        const year = value.substring(2, 6);
        const date = new Date(year, month, 0);

        const dateInput = new Date(date);
        const currentDate = new Date();


        if (dateInput <= currentDate || month > 12) {
            setErrorExpiry('Wrong date')
        }
        else {
            setErrorExpiry('');
        }
        setExpiry(value);
    }

    const isEmptyForm = () => name === '' || number === '' || expiry === '';
    return (
        <div className="card-input">
            <div className="form-title">{props.card ? 'Edit card details' : 'Add card'}</div>
            <div className="card-number">
                <Cards
                    cvc=""
                    expiry={expiry}
                    focused={focus}
                    name={name}
                    number={number}
                />
            </div>
            <form className="form">
                <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="number">Card Number</label>
                    <input
                        className="input"
                        type="tel"
                        value={number}
                        name="number"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        maxLength={16}
                    />
                    <span className="error">{errorNumber}</span>
                </div>
                <div className="form-field">
                    <label htmlFor="expiry">Expires on</label>
                    <input
                        className="input"
                        type="text"
                        value={expiry}
                        name="expiry"
                        maxLength={6}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <span className="error">{errorExpiry}</span>
                </div>
                <button className={`btn-save ${isEmptyForm() || errorNumber.length || errorExpiry.length ? 'disabled' :  ''}`} onClick={onClick}> Save</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({ cards: state.cards.cards });

const mapDispatchToProps = dispatch => {
    return {
        addNewCard: (card: CardType) => dispatch(addNewCard(card)),
        editExistingCard: (card: CardType) => dispatch(editExistingCard(card))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardInputForm));