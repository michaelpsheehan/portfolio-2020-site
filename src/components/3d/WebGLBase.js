import React from 'react'
import ExplodingSphere from './exploding-sphere/index'

const WebGlBase = ({ sceneName, userScale }) => {
  const getScene = (scene) => {
    switch (scene) {
      case 'exploding-sphere':
        return <ExplodingSphere userScale={userScale} />
    }
  }

  const scene = getScene(sceneName)

  return scene ? scene : null
}

export default WebGlBase
