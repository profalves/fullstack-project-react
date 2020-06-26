import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import StockListPage from './List';

const UserIndexPage = memo(() => {
  return (
    <Switch>
      <Route path='/' component={StockListPage} />
    </Switch>
  );
});

export default UserIndexPage;
