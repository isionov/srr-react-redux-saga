import loadable from '@loadable/component'

export const HomeComponent = loadable(() => import('./HomePage.jsx'), { ssr: true });