import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Flex, Button } from 'antd-mobile';
import { Title } from 'components';
import { Link } from 'react-router-dom';
import tickIcon from 'components/icons/tick-circle.svg';
import { StarIcon, HappinessIcon } from 'components/icons';
import s from './profile.css';

export const ProfileContent = createReactClass({
    displayName: 'ProfilePageContent',

    propTypes: {
        profile: PropTypes.shape().isRequired,
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

        return (
            <div className={s.section}>
                <Title>Car</Title>
                <div className={s.cars}>
                    {_.map(cars, (car, index) => {
                        const {
                            brand, model: carModel, color, numberOfSeats, licensePlate,
                        } = car;

                        return (
                            <div key={`car-${index}`} className={s.car}>
                                <div>{`${brand} ${carModel} (${color}, ${numberOfSeats} seats)`}</div>
                                <div>{licensePlate}</div>
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

    renderRate() {
        const rate = 4.6;
        const starsWidth = 90;

        return (
            <div className={s.rate}>
                <div className={classNames(s.stars, s._blank)}>
                    {_.map(_.range(0, 5), (star, index) => (
                        <div className={s.star} key={`star-${index}`}>
                            <StarIcon />
                        </div>
                    ))}
                </div>
                <div
                    className={classNames(s.stars, s._filled)}
                    style={{ width: `${rate / 5 * starsWidth}px` }}
                >
                    {_.map(_.range(0, 5), (star, index) => (
                        <div className={s.star} key={`star-${index}`}>
                            <StarIcon color="#007AFF" />
                        </div>
                    ))}
                </div>
                <div className={s.rateValue}>{`${rate}/5`}</div>
            </div>
        );
    },

    renderReviewsInfo() {
        return (
            <div>
                <div className={classNames(s.infoField, s.rateWrapper)}>
                    {this.renderRate()}
                    <span className={s.review}>104 review</span>
                </div>
                <div className={s.infoField}>
                    Number of trips
                    <span className={s.infoValue}>112</span>
                </div>
                <div className={s.infoField}>
                    Number of completed trips
                    <span className={s.infoValue}>98</span>
                </div>
                <div className={s.infoField}>
                    Number of canceled trips
                    <span className={s.infoValue}>14</span>
                </div>
            </div>
        );
    },

    render() {
        const { profile, isYourProfile } = this.props;
        const {
            firstName, lastName, phone, email, isPhoneValidated,
            paypalAccount, shortDesc, age,
        } = profile;

        return (
            <div className={s.container}>
                <div className={s.profile}>
                    <div className={s.photo}>
                        <HappinessIcon />
                    </div>
                    <div className={s.name}>
                        {`${firstName} ${lastName}`}
                        {age ? ` (${age} years)` : null}
                    </div>
                </div>
                {this.renderReviewsInfo()}
                {isYourProfile || (shortDesc && !isYourProfile) ? (
                    <div className={s.section}>
                        <Title>{isYourProfile ? 'About you' : 'About'}</Title>
                        <div className={s.infoField}>
                            {shortDesc || 'A few words about myself'}
                        </div>
                    </div>
                ) : null}
                <div className={s.section}>
                    <Title>Contacts</Title>
                    {phone ? (
                        <div className={s.infoField}>
                            {phone}
                            {isPhoneValidated && isYourProfile ? (
                                <div className={s.tick} style={{ backgroundImage: `url(${tickIcon})` }} />
                            ) : null}
                        </div>
                    ) : null}
                    <div className={s.infoField}>
                        {email}
                        {isYourProfile ? (
                            <div className={s.tick} style={{ backgroundImage: `url(${tickIcon})` }} />
                        ) : null}
                    </div>
                </div>
                {isYourProfile ? (
                    <div>
                        {this.renderCars()}
                        <div className={s.section}>
                            <Title>PayPal</Title>
                            <div className={s.infoField}>
                                {paypalAccount}
                            </div>
                        </div>
                        {this.renderFooter()}
                    </div>
                ) : null}
            </div>
        );
    },
});