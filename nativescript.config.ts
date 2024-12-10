import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.didit360.app',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    codeCache: true,
    enableScreenshots: true,
    enableTimers: true,
    forceLog: false,
    maxLogcatObjectSize: 2048,
    backgroundServices: []
  },
  ios: {
    discardUncaughtJsExceptions: true,
    enableScreenshots: true,
    enableTimers: true,
    forceLog: false
  },
  useLegacyWorkflow: false,
  webpackConfigPath: 'webpack.config.js'
} as NativeScriptConfig;