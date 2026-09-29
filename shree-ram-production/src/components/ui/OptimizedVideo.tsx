import React from 'react';
import { VideoFacade, type VideoFacadeProps } from './VideoFacade';

export type OptimizedVideoProps = VideoFacadeProps;

/**
 * OptimizedVideo is a drop-in component that delegates to VideoFacade
 * for industry-standard poster-first video loading and performance optimization.
 */
export const OptimizedVideo: React.FC<OptimizedVideoProps> = (props) => {
  return <VideoFacade {...props} />;
};

export default OptimizedVideo;
