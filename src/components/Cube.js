import { BoxGeometry, MeshNormalMaterial, Mesh } from 'three'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { Context } from './Scene'

export default class Cube extends Component {
  static contextType = Context

  static propTypes = {
    size: PropTypes.number,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number
    }),
    rotation: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number
    })
  }

  static defaultProps = {
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    }
  }

  constructor (props) {
    super(props)

    const { size } = props
    const geometry = new BoxGeometry(size, size, size)
    const material = new MeshNormalMaterial()
    this.mesh = new Mesh(geometry, material)
  }

  componentDidMount () {
    this.context.addToScene(this.mesh)
  }

  render () {
    const { position, rotation } = this.props

    for (const key in position) {
      this.mesh.position[key] = position[key]
    }

    for (const key in rotation) {
      this.mesh.rotation[key] = rotation[key]
    }

    return null
  }
}
