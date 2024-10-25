import React from 'react';
import { Layout, Link } from '@arco-design/web-react';
import { FooterProps } from '@arco-design/web-react/es/Layout/interface';
import cs from 'classnames';
import styles from './style/index.module.less';

function Footer(props: FooterProps = {}) {
  const { className, ...restProps } = props;
  return (
    <Layout.Footer className={cs(styles.footer, className)} {...restProps}>
      Copyright © 2024
      <Link href="https://github.com/HarryYe66">dexcc.cc</Link>
    </Layout.Footer>
  );
}

export default Footer;
