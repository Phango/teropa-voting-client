import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import Winner from './Winner';
import Vote from './Vote';

export class Voting extends React.Component {
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

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        winner: state.get('winner')
    };
}

export const VotingContainer = connect(mapStateToProps)(Voting);

// connect(mapStateToProps)(Voting);
//
// export default Voting;
