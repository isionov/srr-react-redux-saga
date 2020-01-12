import loadable from '@loadable/component'

export const CatsComponent = loadable(() => import('./CatsPage.jsx'), { ssr: true });