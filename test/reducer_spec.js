import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1
          })
        })
      })
    }
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 1
        }
      }
    }));

  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            Trainspotting: 1
          }
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 1
        }
      }
    }));

  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            Trainspotting: 1
          }
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 1
        }
      }
    }))
  })

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES',
      entries: ['Trainspotting']
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: [
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ]
    });
    const action = {
      type: 'NEXT'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: ['Sunshine']
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      entries: [],
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 2
        }
      }
    });
    const action = {
      type: 'VOTE',
      entry: 'Trainspotting'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: [],
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 3
        }
      }
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Trainspotting'
    }));
  });

});
