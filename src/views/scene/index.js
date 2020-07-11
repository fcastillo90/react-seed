/* React */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './containers/App'

const SceneRoutes = () => {
  return (
    <>
      <Switch>
        <Route component={App} />
      </Switch>
    </>
  )
}

export default SceneRoutes
