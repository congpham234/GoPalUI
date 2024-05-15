import React from 'react';
import { Spin } from 'antd';
import Player from 'lottie-react';
import animationData from '../assets/animations/loading-animation.json'; // Update the path as needed
import styles from './LoadingComponent.module.scss';

const LoadingComponent = () => (
  <div className={styles.loadingContainer}>
    <Player
      autoplay
      loop
      animationData={animationData}
      style={{ height: '300px', width: '300px' }}
    />
    <div className={styles.loadingText}>Planning Your Fucking Amazing Trip ...</div>
  </div>
);

export default LoadingComponent;
