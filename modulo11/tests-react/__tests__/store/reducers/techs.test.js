import reducer, { INITIAL_STATE } from '~/store/modules/techs/reducers';
import * as Techs from '~/store/modules/techs/actions';

describe('Techs reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@techs/ADD_TECH', () => {
    const state = reducer(INITIAL_STATE, Techs.addTech('Node.js'));

    expect(state).toStrictEqual(['Node.js']);
  });
});
