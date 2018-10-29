import { WebGLRenderer as TWebGLRenderer } from 'three'
import { EffectComposer, RenderPass, EffectPass } from 'postprocessing'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Clock from './Clock'

export const Context = React.createContext({
  setScene: () => {},
  setCamera: () => {}
})

export default class Renderer extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.element
  }

  static defaultProps = {
    onTick: () => {}
  }

  frame = 0
  canvas = React.createRef()
  passes = []

  componentDidMount () {
    this.renderer = new TWebGLRenderer({
      canvas: this.canvas.current
    })

    const { width, height } = this.props
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.composer = new EffectComposer(this.renderer)

    const renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(renderPass)
    renderPass.renderToScreen = true

    if (this.passes.length) {
      renderPass.renderToScreen = false
      const effect = new EffectPass(this.camera, ...this.passes)
      effect.renderToScreen = true
      this.composer.addPass(effect)
    }
  }

  setScene = scene => (this.scene = scene)

  setCamera = camera => (this.camera = camera)

  addPass = pass => {
    this.passes.push(pass)
  }

  update = ({ delta }) => {
    if (this.composer) {
      this.composer.render(delta)
    }

    return null
  }

  render () {
    const { width, height, children } = this.props

    if (this.renderer) {
      this.renderer.setSize(width, height)
      this.renderer.setPixelRatio(window.devicePixelRatio)
    }

    return (
      <Context.Provider
        value={{
          addPass: this.addPass,
          setScene: this.setScene,
          setCamera: this.setCamera
        }}
      >
        <Clock children={this.update} />
        <canvas ref={this.canvas} />
        {children}
      </Context.Provider>
    )
  }
}
