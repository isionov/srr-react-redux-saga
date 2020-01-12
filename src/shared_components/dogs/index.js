import loadable from '@loadable/component'

export const DogsComponent = loadable(() => import('./DogsPage.jsx'), { ssr: true });