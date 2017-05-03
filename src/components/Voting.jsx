import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Winner from './Winner';
import Vote from './Vote';

class Voting extends React.Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState)
    }

    render() {
        return <div>
            {this.props.winner ?
            <Winner ref="winner" winner={this.props.winner} /> :
                <Vote {...this.props} />
            }
        </div>
    }
};

export default Voting;
