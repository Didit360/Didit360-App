import { performance } from 'perf_hooks';
import logger from './logger';

export const measurePerformance = (name: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const start = performance.now();
      const result = await originalMethod.apply(this, args);
      const end = performance.now();
      const duration = end - start;

      logger.info({
        type: 'performance',
        name,
        duration: `${duration.toFixed(2)}ms`
      });

      return result;
    };

    return descriptor;
  };
};