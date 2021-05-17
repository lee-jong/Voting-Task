import React from 'react';
import App, { Container } from 'next/app';
import BaseLayout from '../components/layout/BaseLayout';

//Util
import { handleRouter } from '../helpers/router'

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    let path = ctx.pathname;

    return { pageProps, path };
  }
  componentDidUpdate(){
    if(this.props.path != '/login' && localStorage.getItem('id') == null) handleRouter('login')
  }

  componentDidMount(){
    if(this.props.path != '/login' && localStorage.getItem('id') == null) handleRouter('login')
  }

  render() {
    const { Component, pageProps, path } = this.props;
    return (
      <Container>
        <BaseLayout path={path}>
          <Component {...pageProps} />
        </BaseLayout>
      </Container>
    );
  }
}

export default MyApp;
