// src/components/FullHeightContainer.tsx

import React from 'react';
import styles from './styles.module.scss';
import { ContainerProps } from './types';

const Container: React.FC<ContainerProps> = ({ children, isTransparent }) => {
  return (
    <div
      className={styles['b-container']}
      data-is-transparent={isTransparent ?? isTransparent}
    >
      {children}
    </div>
  );
};

export default Container;
