import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { checkIfRideStarted } from 'components/utils';
import { DriverIcon, TravelerIcon } from 'components/icons';
import s from './ride.css';

export class RideItem extends React.Component {
    renderRideAdditionalInfo() {
        const { data, authorType, userPk } = this.props;
        const { availableNumberOfSeats, numberOfSeats, bookings } = data;

        if (authorType === 'driver') {
            return (
                <span>
                    {`${numberOfSeats - availableNumberOfSeats}/${numberOfSeats} booked`}
                </span>
            );
        }

        if (authorType === 'passenger') {
            const { seatsCount } = _.filter(bookings, ({ client }) => client.pk === userPk)[0];

            return (
                <span>
                    {seatsCount}
                    {seatsCount === 1 ? ' seat' : ' seats'}
                    {' booked'}
                </span>
            );
        }

        return (
            <span>
                {`${availableNumberOfSeats}/${numberOfSeats}`}
                {availableNumberOfSeats === 1 ? ' seat' : ' seats'}
            </span>
        );
    }

    renderRideInfo() {
        const { data, history, authorType } = this.props;
        const {
            pk, dateTime: date, hasMyReviews, rating, bookings,
        } = data;
        const isRideStarted = checkIfRideStarted(date);
        const canBeRated = isRideStarted && bookings.length;

        const price = authorType === 'driver' ? data.price : data.priceWithFee;

        if (canBeRated && !hasMyReviews) {
            return (
                <div
                    className={s.info}
                    onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/app/rate/${pk}`);
                    }}
                >
                    <div className={s.link}>Rate it</div>
                </div>
            );
        }

        if (canBeRated && hasMyReviews) {
            const { value, count } = rating;

            return (
                <div className={s.info}>
                    <span style={{ whiteSpace: 'nowrap' }}>{`${_.round(value, 2)}/5`}</span>
                    <span className={s.gray}>
                        {`${count} ${count === 1 ? 'review' : 'reviews'}`}
                    </span>
                </div>
            );
        }

        return (
            <div className={s.info}>
                <span style={{ whiteSpace: 'nowrap' }}>$ {parseFloat(price).toString()}</span>
                <span className={s.gray}>
                    {this.renderRideAdditionalInfo()}
                </span>
            </div>
        );
    }

    render() {
        const {
            data, history, icon, onClick, preventRedirect,
        } = this.props;
        const {
            cityFrom, cityTo, pk, dateTime: date, hasMyReviews, bookings,
        } = data;
        const isRideStarted = checkIfRideStarted(date);
        const canBeRated = isRideStarted && bookings.length;

        return (
            <div
                className={classNames(s.ride, {
                    [s._highlight]: canBeRated && !hasMyReviews,
                })}
                onClick={() => {
                    if (onClick && preventRedirect) {
                        onClick();

                        return;
                    }

                    history.push(`/app/ride/${pk}`);
                }}
            >
                <div className={s.userTypeIcon}>{icon}</div>
                <div className={s.date}>
                    <div style={{ whiteSpace: 'nowrap' }}>{moment(date).format('h:mm A')}</div>
                    <div className={s.gray}>{moment(date).format('MMM D')}</div>
                </div>
                <div className={s.direction}>
                    {`${cityFrom.name}, ${cityFrom.state.name}`}
                    <span className={s.gray}>{`${cityTo.name}, ${cityTo.state.name}`}</span>
                </div>
                {this.renderRideInfo()}
            </div>
        );
    }
}

RideItem.propTypes = {
    data: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    icon: PropTypes.node,
    authorType: PropTypes.string,
    userPk: PropTypes.string,
    onClick: PropTypes.func,
    preventRedirect: PropTypes.bool,
};

RideItem.defaultProps = {
    icon: <DriverIcon color="#40A9FF" />,
    authorType: '',
    userPk: null,
    onClick: () => {},
    preventRedirect: false,
};

export const RideRequestItem = ({ data, history, icon }) => {
    const {
        cityFrom, cityTo, dateTime: date, pk,
    } = data;

    return (
        <div
            className={s.ride}
            onClick={() => history.push(`/app/request/${pk}`)}
        >
            <div className={s.userTypeIcon}>{icon}</div>
            <div className={s.date}>
                <div style={{ whiteSpace: 'nowrap' }}>{moment(date).format('h:mm A')}</div>
                <div className={s.gray}>{moment(date).format('MMM D')}</div>
            </div>
            <div className={s.direction}>
                {`${cityFrom.name}, ${cityFrom.state.name}`}
                <span className={s.gray}>{`${cityTo.name}, ${cityTo.state.name}`}</span>
            </div>
        </div>
    );
};

RideRequestItem.propTypes = {
    data: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    icon: PropTypes.node,
};

RideRequestItem.defaultProps = {
    icon: <TravelerIcon color="#40A9FF" />,
};
