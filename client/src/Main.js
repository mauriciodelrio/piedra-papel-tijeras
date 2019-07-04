import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Pages components
import Home from './pages/Home'

const Main = () => (
  <main className="main hh100">
    <Switch>

      <Route exact path='/' component={Home} />

    </Switch>
  </main>
)

export default Main