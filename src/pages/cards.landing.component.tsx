import React from 'react';
import { Route, RouteChildrenProps } from 'react-router-dom';
import CardsOverview from '../components/cards-overview/cards-overview/cards.overview.component';

const CardsPage: React.FC<RouteChildrenProps> = (props) => {
    const path = props.match?.path;
    return (
        <div>
            <Route exact path={`${path}`} component={CardsOverview} />
        </div>

    )
}
export default CardsPage;