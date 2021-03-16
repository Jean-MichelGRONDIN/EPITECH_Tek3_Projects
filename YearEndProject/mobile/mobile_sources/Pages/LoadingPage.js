import React from 'react';

import { Text } from 'react-native';

class LoadingPage extends React.Component {
    render() {
        return (
                <Text style={{color: 'white'}}>Loading, please wait ...</Text>
        );
    }
}

export default LoadingPage;
