import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { CardType } from '../../utils';

import './cards.overview.styles.scss';

interface Props extends RouteChildrenProps {
    cards: CardType[];
}

class CardsOverview extends React.PureComponent<Props>  {
    onAddCard = () => {
        const { history, match } = this.props;
        history.push(`${match?.url}/add`);
    }

    onEditCard = (cardId: string) => {
        const { history, match } = this.props;
        history.push(`${match?.url}/${cardId}/edit`);
    }

    render() {
        return (
            <div className="cards-overview">
                <div className="cards-title">Cards</div>
                {this.props.cards.map((card, id) =>
                    <div className="card-overview-item" key={id} onClick={() => this.onEditCard(card.id)}>{`Card ${id+1}`}</div>
                )}
                <button className="btn-add" onClick={this.onAddCard}>Add card</button>
            </div>
        )
    };
}

const mapStateToProps = state => ({ cards: state.cards.cards });

export default connect(mapStateToProps)(CardsOverview);