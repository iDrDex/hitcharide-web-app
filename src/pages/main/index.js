import React from 'react';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import { Route, withRouter } from 'react-router-dom';
import { Flex, TabBar } from 'antd-mobile';
import { SearchPage, MyRidesPage, ProfilePage } from 'pages';

import searchIcon from './images/search.svg';
import routeIcon from './images/route.svg';
import profileIcon from './images/user.svg';
import searchIconActive from './images/search-active.svg';
import routeIconActive from './images/route-active.svg';
import profileIconActive from './images/user-active.svg';

const tabs = [
    {
        title: 'Browse',
        name: 'searchTab',
        path: '/',
        icon: searchIcon,
        iconActive: searchIconActive,
    },
    {
        title: 'My Rides',
        name: 'ridesTab',
        path: '/my-rides',
        icon: routeIcon,
        iconActive: routeIconActive,
    },
    {
        title: 'Profile',
        name: 'profileTab',
        path: '/profile',
        icon: profileIcon,
        iconActive: profileIconActive,
    },
];

const Icon = ({ icon }) => (
    <div
        style={{
            width: '22px',
            height: '22px',
            background: `url(${icon}) center center /  21px 21px no-repeat`,
        }}
    />
);

export const MainPage = withRouter(createReactClass({
    getInitialState() {
        return {
            selectedTab: 'searchTab',
        };
    },

    render() {
        return (
            <Flex direction="column" align="stretch" justify="center" style={{ height: '100%' }}>
                <Route path="/" exact component={SearchPage} />
                <Route path="/my-rides" component={MyRidesPage} />
                <Route path="/profile" component={ProfilePage} />
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    {_.map(tabs, (tab, index) => (
                        <TabBar.Item
                            title={tab.title}
                            key={`tab-${index}`}
                            icon={(<Icon icon={tab.icon} />)}
                            selectedIcon={(<Icon icon={tab.iconActive} selected />)}
                            selected={this.props.location.pathname === tab.path}
                            onPress={() => {
                                this.setState({ selectedTab: tab.name });
                                this.props.history.push(tab.path);
                            }}
                        />
                    ))}
                </TabBar>
            </Flex>
        );
    },
}));
