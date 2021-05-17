import React from 'react';

//Component
import Meta from '../shared/Meta';
import UserInfo from '../shared/UserInfo';

const BaseLayout = ({ children, path }) => {
  return (
    <>
      <Meta />
      {path != '/login' && <UserInfo />}
      {children}
    </>
  );
};

export default BaseLayout;
