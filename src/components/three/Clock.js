import { Clock as TClock } from 'three'
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Clock extends Component {
  static propTypes = {
    children: PropTypes.func
  }

  clock = new TClock()

  state = {
    elapsedTime: 0,
    delta: 0
  }

  componentDidMount () {
    window.requestAnimationFrame(this.onFrame)
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.onFrame)
  }

  onFrame = () => {
    this.setState({
      elapsedTime: this.clock.getElapsedTime(),
      delta: this.clock.getDelta()
    })

    window.requestAnimationFrame(this.onFrame)
  }

  render () {
    const { children: render } = this.props

    return render({ ...this.state })
  }
}
