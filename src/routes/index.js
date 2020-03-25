import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Orders from '../pages/Orders';
import Deliverymans from '../pages/Deliverymans';
import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';

import DeliverymansRegister from '~/pages/_Register/DeliverymansRegister';
import RecipientsRegister from '~/pages/_Register/RecipientsRegister';
import OrdersRegister from '~/pages/_Register/OrdersRegister';

import DeliverymansEdit from '~/pages/_Edit/DeliverymansEdit';
import RecipientsEdit from '~/pages/_Edit/RecipientsEdit';
import OrdersEdit from '~/pages/_Edit/OrdersEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/deliverymans" component={Deliverymans} exact isPrivate />
      <Route path="/recipients" component={Recipients} exact isPrivate />
      <Route path="/problems" component={Problems} isPrivate />

      <Route
        path="/deliverymans/register"
        component={DeliverymansRegister}
        isPrivate
      />
      <Route
        path="/recipients/register"
        component={RecipientsRegister}
        isPrivate
      />
      <Route path="/orders/register" component={OrdersRegister} isPrivate />

      <Route
        path="/deliverymans/edit/:id"
        component={DeliverymansEdit}
        isPrivate
      />
      <Route path="/recipients/edit/:id" component={RecipientsEdit} isPrivate />
      <Route path="/orders/edit/:id" component={OrdersEdit} isPrivate />
    </Switch>
  );
}
