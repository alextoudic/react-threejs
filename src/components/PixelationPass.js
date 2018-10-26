import { Component } from 'react'
import PropTypes from 'prop-types'
import { PixelationEffect } from 'postprocessing'

import { Context } from './Renderer'

class PixelationPass extends Component {
  static contextType = Context

  static propTypes = {
    granularity: PropTypes.number
  }

  constructor (props) {
    super(props)

    this.effect = new PixelationEffect(props.granularity)
  }

  componentDidMount () {
    this.context.addPass(this.effect)
  }

  render () {
    this.effect.setGranularity(this.props.granularity)

    return this.props.children
  }
}

export default PixelationPass
