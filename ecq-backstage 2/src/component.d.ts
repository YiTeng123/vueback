import Component from './components/component'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Component: typeof Component
  }
}