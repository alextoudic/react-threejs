import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PerspectiveCamera as TPerspectiveCamera } from 'three'

import { Context as RendererContext } from './Renderer'
import { Context as SceneContext } from './Scene'

class Camera extends PureComponent {
  static propTypes = {
    setCamera: PropTypes.func,
    addToScene: PropTypes.func,
    fov: PropTypes.number, // Camera frustum vertical field of view.
    aspect: PropTypes.number, // Camera frustum aspect ratio.
    near: PropTypes.number, // Camera frustum near plane.
    far: PropTypes.number, // Camera frustum far plane.
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

    const { fov, aspect, near, far } = props
    this.camera = new TPerspectiveCamera(fov, aspect, near, far)
  }

  componentDidMount () {
    this.props.setCamera(this.camera)
    this.props.addToScene(this.camera)
  }

  render () {
    // const { aspect, position, rotation } = this.props
    const { aspect, position } = this.props

    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()

    for (const key in position) {
      this.camera.position[key] = position[key]
    }

    // for (const key in rotation) {
    //   this.camera.rotation[key] = rotation[key]
    // }

    return null
  }
}

const EnhancedCamera = props => (
  <RendererContext.Consumer>
    {({ setCamera }) => (
      <SceneContext.Consumer>
        {({ addToScene }) => (
          <Camera {...props} setCamera={setCamera} addToScene={addToScene} />
        )}
      </SceneContext.Consumer>
    )}
  </RendererContext.Consumer>
)

EnhancedCamera.displayName = 'withRenderer(withScene(Camera))'

export default EnhancedCamera
