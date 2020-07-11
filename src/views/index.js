/* Dependencies */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SceneRoutes from './scene'

const Components = () => {
  return (
    <Router basename="/beta">
      <Switch>
        <Route component={SceneRoutes} />
      </Switch>
    </Router>
  )
}

export default Components
