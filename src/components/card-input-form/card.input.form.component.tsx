import React from 'react';
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

class CardInputForm extends React.Component<PropsType> {
    state = this.populateInitialState();

    populateInitialState() {
        if (this.props.card) {
            return {
                ...this.props.card
            }
        }
        return {
            expiry: '',
            focused: '',
            name: '',
            number: '',
            focus: '',
            errorNumber: '',
            errorExpiry: ''
        }
    }

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'number') {
            this.validateCreditCard(name, value);
        }
        else if (name === 'expiry') {
            this.validateExpiryDate(name, value);
        }
        else {
            this.setState({ [name]: value });
        }

    }

    onClick = (e) => {
        e.preventDefault();

        const { cards, addNewCard, editExistingCard, card, history } = this.props;
        const { name, number, expiry } = this.state;

        const cardObj: CardType = {
            id: `card-${cards.length + 1}`,
            name,
            number,
            expiry
        }

        const action = card ? editExistingCard : addNewCard
        action(cardObj);
        history.push('/cards');

    };

    validateCreditCard = (name, value) => {
        if (!validator.isCreditCard(value)) {
            this.setState({ errorNumber: 'Wrong card number' });
            this.setState({ [name]: value });
        }
        else {
            this.setState({ [name]: value, errorNumber: '' });
        }
    }

    validateExpiryDate = (name, value) => {
        const month = value.substring(0, 2);
        const year = value.substring(2, 6);
        const date = new Date(year, month, 0);

        const dateInput = new Date(date);
        const currentDate = new Date();


        if (dateInput <= currentDate || month > 12) {
            this.setState({ errorExpiry: 'Wrong date' });
            this.setState({ [name]: value });
        }
        else {
            this.setState({ [name]: value, errorExpiry: '' });
        }
    }

    isEmptyForm() {
        const { name, number, expiry } = this.state;

        return name === '' || number === '' || expiry === '';
    }

    render() {
        const { name, number, focus, expiry, errorNumber, errorExpiry } = this.state;
        const title = this.props.card ? 'Edit card details' : 'Add card';

        const disabled = this.isEmptyForm() || errorNumber || errorExpiry;
        return (
            <div className="card-input">
                <div className="form-title">{title}</div>
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
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="number">Card Number</label>
                        <input
                            className="input"
                            type="tel"
                            value={number}
                            name="number"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
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
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                        <span className="error">{errorExpiry}</span>
                    </div>
                    <button className={`btn-save ${disabled ? 'disabled' : ''}`} onClick={this.onClick}> Save</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({ cards: state.cards.cards });

const mapDispatchToProps = dispatch => {
    return {
        addNewCard: (card: CardType) => dispatch(addNewCard(card)),
        editExistingCard: (card: CardType) => dispatch(editExistingCard(card))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardInputForm));