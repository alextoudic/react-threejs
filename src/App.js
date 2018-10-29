import React, { Fragment } from 'react'

import Experiment from './components/Experiment'

export default () => (
  <Fragment>
    <Experiment />
    <div className='infos'>
      <p>
        The only purpose of this demo is to experiment manipulating WebGL through JSX.
        <br />
        Check out sources on
        {' '}
        <a href='https://github.com/alextoudic/react-threejs'>GitHub</a>.
      </p>
      <a
        className='twitter'
        href='https://twitter.com/alextoudic'
        target='_blank'
        rel='noopener noreferrer'
      >
        @alextoudic
      </a>
    </div>
  </Fragment>
)
