import { Scene as TScene } from 'three'
import React, { Component } from 'react'

import { Context as RendererContext } from './Renderer'
export const Context = React.createContext({ addToScene: () => {} })

export default class Scene extends Component {
  static contextType = RendererContext

  constructor (props) {
    super(props)

    this.scene = new TScene()
  }

  componentDidMount () {
    this.context.setScene(this.scene)
  }

  addToScene = element => this.scene.add(element)

  render () {
    const { children } = this.props

    return (
      <Context.Provider value={{ addToScene: this.addToScene }}>
        {children}
      </Context.Provider>
    )
  }
}
