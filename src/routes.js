import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from 'src/pages/Home'
import Feedback from 'src/pages/FeedBack/FeedBack'
import Result from 'src/pages/FeedBack/Result'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/fb' component={Feedback}/>
    <Route exact path='/fb/results' component={Result}/>
  </Switch>
)

export default Routes