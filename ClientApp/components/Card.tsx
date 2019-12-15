import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PropTypes } from 'react';

const Card = ({ rank, suit, isPrivate }) => {
    /**
     * Renders the top and bottom container
     * element. Keeps markup DRY.
     *
     * @return     {ReactElement}    markup
     */
    const renderContainer = () => {
        return (
            <div className="container">
                <span className="rank">{rank}</span>
                <span className="suit">{suit}</span>
            </div>
        );
    }

    /**
     * Renders the front of the card.
     *
     * @return     {ReactElement}    markup
     */
    const renderFront = () => {
        return (
            <div className="front">
                <div className="section top">
                    {renderContainer()}
                </div>
                <div className="section center suit">{suit}</div>
                <div className="section bottom">
                    {renderContainer()}
                </div>
            </div>
        );
    }

    return (
        <div className={`card ${suit}`} data-private={isPrivate}>
            {!isPrivate && renderFront()}
            <div className="back"></div>
        </div>
    );
}

/**
 * Defines property types for this component.
 */
Card.prototype = {
    rank: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    suit: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool,
};

export default Card;