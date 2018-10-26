import React from 'react'

import {
  Clock,
  Renderer,
  BloomPass,
  PixelationPass,
  Camera,
  Scene,
  Cube
} from './components'

import Resize from './Resize'

const M_2_PI = Math.PI * 2
export default () => (
  <Resize>
    {({ width, height }) => (
      <Renderer width={width} height={height}>
        <BloomPass>
          <PixelationPass granularity={20.0}>
            <Scene>
              <Camera
                fov={75}
                aspect={width / height}
                near={0.1}
                far={2000}
                position={{
                  z: 600
                }}
              />
              <Clock>
                {({ elapsedTime }) => (
                  <Cube
                    size={200}
                    rotation={{
                      x: Math.cos(elapsedTime / 2) * M_2_PI,
                      y: Math.sin(elapsedTime / 2) * M_2_PI,
                      z: Math.tan(elapsedTime / 2) * M_2_PI
                    }}
                  />
                )}
              </Clock>
            </Scene>
          </PixelationPass>
        </BloomPass>
      </Renderer>
    )}
  </Resize>
)
