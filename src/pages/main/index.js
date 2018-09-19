import React from 'react';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import BaobabPropTypes from 'baobab-prop-types';
import { TabBar } from 'antd-mobile';
import { TopBar } from 'components';
import { Route } from 'react-router-dom';
import {
    SearchPage, MyRidesPage, NewRidePage,
    CalendarPage, ProfilePage, RideDetailsPage,
} from 'pages';
import { getUserType } from 'components/utils';

import searchIcon from './images/search.svg';
import routeIcon from './images/route.svg';
import addIcon from './images/plus.svg';
import calendarIcon from './images/calendar.svg';
import searchIconActive from './images/search-active.svg';
import routeIconActive from './images/route-active.svg';
import addIconActive from './images/plus-active.svg';
import calendarIconActive from './images/calendar-active.svg';
import s from './main.css';

const tabs = [
    {
        title: 'Search a ride',
        path: '/app',
        icon: searchIcon,
        iconActive: searchIconActive,
    },
    {
        title: 'My rides',
        path: '/app/my-rides',
        icon: routeIcon,
        iconActive: routeIconActive,
    },
    {
        title: 'Calendar',
        path: '/app/calendar',
        icon: calendarIcon,
        iconActive: calendarIconActive,
    },
    {
        title: 'Create a ride',
        path: '/app/create-ride',
        icon: addIcon,
        iconActive: addIconActive,
    },
];

const Icon = ({ icon }) => (
    <div
        style={{
            width: '22px',
            height: '22px',
            background: `url(${icon}) center center / 21px 21px no-repeat`,
        }}
    />
);

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
};

export const MainPage = createReactClass({
    propTypes: {
        tree: BaobabPropTypes.cursor.isRequired,
        tokenCursor: BaobabPropTypes.cursor.isRequired,
        match: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }).isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
        history: PropTypes.shape().isRequired,
    },

    contextTypes: {
        services: PropTypes.shape({
            getMyProfileService: PropTypes.func.isRequired,
            getCarListService: PropTypes.func.isRequired,
        }),
    },

    async componentDidMount() {
        const { getMyProfileService, getCarListService } = this.context.services;

        this.props.tree.userType.set(getUserType() || 'passenger');
        await getMyProfileService(this.props.tree.profile);
        await getCarListService(this.props.tree.cars);
    },

    componentWillUnmount() {
        this.props.tree.set({});
    },

    render() {
        const userType = this.props.tree.userType.get() || 'passenger';
        const { url } = this.props.match;

        return (
            <div className={s.container}>
                <TopBar
                    userTypeCursor={this.props.tree.select('userType')}
                    history={this.props.history}
                    profile={this.props.tree.profile.get()}
                    cars={this.props.tree.cars.get()}
                />
                <div>
                    <Route
                        exact
                        path={url}
                        render={(props) => (
                            <SearchPage
                                {..._.merge(this.props, props)}
                                tree={this.props.tree.select('searchTab')}
                                userType={userType}
                            />
                        )}
                    />
                    <Route
                        path={`${url}/my-rides`}
                        render={() => (
                            <MyRidesPage {...this.props} />
                        )}
                    />
                    <Route
                        path={`${url}/calendar`}
                        render={() => (
                            <CalendarPage {...this.props} />
                        )}
                    />
                    <Route
                        path={`${url}/create-ride`}
                        render={(props) => (
                            <NewRidePage
                                {..._.merge(this.props, props)}
                                userType={userType}
                                tree={this.props.tree}
                            />
                        )}
                    />
                    <Route
                        path={`${url}/profile`}
                        render={(props) => (
                            <ProfilePage
                                {..._.merge(this.props, props)}
                                tree={this.props.tree}
                            />
                        )}
                    />
                    <Route
                        path={`${url}/ride/:pk`}
                        render={(props) => (
                            <RideDetailsPage
                                {..._.merge(this.props, props)}
                                tree={this.props.tree.select('')}
                            />
                        )}
                    />
                </div>
                <div className={s.tabs}>
                    <TabBar
                        unselectedTintColor="#8C8D8F"
                        tintColor="#4263CA"
                        barTintColor="white"
                    >
                        {_.map(tabs, (tab, index) => (
                            <TabBar.Item
                                title={tab.title}
                                key={`tab-${index}`}
                                icon={(<Icon icon={tab.icon} />)}
                                selectedIcon={(<Icon icon={tab.iconActive} selected />)}
                                selected={this.props.location.pathname === tab.path}
                                onPress={() => this.props.history.push(tab.path)}
                            />
                        ))}
                    </TabBar>
                </div>
            </div>
        );
    },
});
