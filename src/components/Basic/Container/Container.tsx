// src/components/FullHeightContainer.tsx

import React from 'react';
import styles from './styles.module.scss';
import { ContainerProps } from './types';

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={styles['b-container']}>{children}</div>;
};

export default Container;
