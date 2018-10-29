import { Component } from 'react'

export default class Resize extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  constructor () {
    super()
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  render () {
    const { width, height } = this.state
    const { children: render } = this.props

    return render({ width, height })
  }
}
