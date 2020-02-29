import React, { useCallback } from 'react';

import { connect } from 'react-redux';

function NotFound404({ history }) {
  const back = useCallback(() => {
    history.push('/test');
  }, [history]);

  return <button onClick={back}>Voltar</button>;
}

export default connect()(NotFound404);
