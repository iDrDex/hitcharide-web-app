import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Flex, Button } from 'antd-mobile';
import { Title, Stars } from 'components';
import { Link } from 'react-router-dom';
import tickIcon from 'components/icons/tick-circle.svg';
import { HappinessIcon } from 'components/icons';
import s from './profile.css';

export const ProfileContent = createReactClass({
    displayName: 'ProfilePageContent',

    propTypes: {
        profile: PropTypes.shape().isRequired,
        match: PropTypes.shape().isRequired,
        cars: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        logout: PropTypes.func,
        isYourProfile: PropTypes.bool,
    },

    getDefaultProps() {
        return {
            logout: () => {},
            isYourProfile: false,
        };
    },

    renderCars() {
        const { cars } = this.props;

        if (cars.length === 0) {
            return null;
        }

        return (
            <div className={s.section}>
                <Title>Car</Title>
                <div className={s.cars}>
                    {_.map(cars, (car, index) => {
                        const {
                            brand, model: carModel, numberOfSeats,
                            licensePlate, productionYear, color, images,
                        } = car;

                        return (
                            <div
                                key={`car-${index}`}
                                className={classNames(s.car, {
                                    [s._withImages]: !_.isEmpty(images),
                                })}
                            >
                                <div className={s.carInfo}>
                                    <div>
                                        {`${brand} ${carModel} `}
                                        {`(${color}, ${numberOfSeats} seats`}
                                        {productionYear ? `, ${productionYear} year)` : ')'}
                                    </div>
                                    {licensePlate ? <div className={s.licensePlate}>{licensePlate}</div> : null}
                                </div>
                                {!_.isEmpty(images) ? (
                                    <div className={s.imagesWrapper}>
                                        <div className={s.images}>
                                            {_.map(images, ({ image }, imageIndex) => (
                                                <div
                                                    key={`car-${index}-image-${imageIndex}`}
                                                    className={s.carImage}
                                                    style={{ backgroundImage: `url(${image})` }}
                                                />
                                            ))}
                                            <div className={s.imagesOffset} />
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },

    renderFooter() {
        return (
            <div className={s.footer}>
                <Flex direction="column" justify="center">
                    <Link
                        to="/app/profile/edit"
                        className="am-button am-button-primary am-button-inline"
                        style={{ width: 250 }}
                    >
                        Edit profile
                    </Link>
                    <div className={s.logout}>
                        <Button
                            inline
                            style={{ width: 250 }}
                            onClick={this.props.logout}
                        >
                            Logout
                        </Button>
                    </div>
                </Flex>
            </div>
        );
    },

    renderStatistics() {
        const { canceled, completed } = this.props.profile.ridesStatistics;

        return (
            <div className={s.statistics}>
                <div className={s.statisticsItem}>
                    <div className={classNames(s.statisticsImage, s._car)} />
                    <div className={s.statisticsTitle}>{completed + canceled}</div>
                    Total trips
                </div>
                <div className={s.statisticsItem}>
                    <div className={classNames(s.statisticsImage, s._happiness)} />
                    <div className={s.statisticsTitle}>{completed}</div>
                    Completed
                </div>
                <div className={s.statisticsItem}>
                    <div className={classNames(s.statisticsImage, s._sadness)} />
                    <div className={s.statisticsTitle}>{canceled}</div>
                    Cancelled
                </div>
            </div>
        );
    },

    renderReviewsInfo() {
        const { match, profile } = this.props;
        const { value: rating, count: reviewsCount } = profile.rating;

        return (
            <div className={classNames(s.infoField, s.ratingWrapper)}>
                <div className={s.starsWrapper}>
                    <Stars
                        rating={rating}
                        className={s.stars}
                        blankColor="#C4C4C4"
                        fillColor="#007AFF"
                        small
                    />
                    <div className={s.ratingValue}>{`${_.round(rating, 2)}/5`}</div>
                </div>
                {reviewsCount ? (
                    <Link to={`${match.url}/reviews`} className={s.link}>
                        {`${reviewsCount} ${reviewsCount === 1 ? 'review' : 'reviews'}`}
                    </Link>
                ) : null}
            </div>
        );
    },

    render() {
        const { profile, isYourProfile } = this.props;
        const {
            displayName, phone, email, isPhoneValidated,
            paypalAccount, shortDesc, age, photo, smsNotifications,
        } = profile;

        return (
            <div className={s.container}>
                <div className={s.profile}>
                    <div className={s.photoWrapper}>
                        {photo ? (
                            <div className={s.photo} style={{ backgroundImage: `url(${photo})` }} />
                        ) : (
                            <div className={s.defaultPhoto}>
                                <HappinessIcon />
                            </div>
                        )}
                    </div>
                    <div className={s.name}>
                        {displayName}
                        {age ? ` (${age} years)` : null}
                    </div>
                </div>
                {this.renderStatistics()}
                {this.renderReviewsInfo()}
                {shortDesc ? (
                    <div className={s.section}>
                        <Title>{isYourProfile ? 'About you' : 'About user'}</Title>
                        <div className={s.infoField}>{shortDesc}</div>
                    </div>
                ) : null}
                {isYourProfile ? (
                    <div className={s.section}>
                        <Title>Contacts</Title>
                        {phone ? (
                            <div className={s.infoField}>
                                +{phone}
                                {isPhoneValidated ? (
                                    <div className={s.tick} style={{ backgroundImage: `url(${tickIcon})` }} />
                                ) : null}
                            </div>
                        ) : null}
                        {isYourProfile ? (
                            <div className={s.infoField}>
                                {email}
                                <div className={s.tick} style={{ backgroundImage: `url(${tickIcon})` }} />
                            </div>
                        ) : null}
                    </div>
                ) : null}
                {isYourProfile && !smsNotifications && phone ? (
                    <div className={s.notifications}>
                        You receive only email notifications.
                    </div>
                ) : null}
                {this.renderCars()}
                {isYourProfile ? (
                    <div>
                        {paypalAccount ? (
                            <div className={s.section}>
                                <Title>PayPal</Title>
                                <div className={s.infoField}>
                                    {paypalAccount}
                                </div>
                            </div>
                        ) : null}
                        {this.renderFooter()}
                    </div>
                ) : null}
            </div>
        );
    },
});
