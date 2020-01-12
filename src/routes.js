import Root from './shared_components/root';
import { HomeComponent } from './shared_components/home';
import { CatsComponent } from './shared_components/cats';
import { DogsComponent } from './shared_components/dogs';
import { getPhrase, saySmthAction } from './modules/home'
import { sendAction } from './store';

const getInitialProps =(dispatch) => {
  dispatch(saySmthAction('FROM ROUTES'));
}

export const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        component: HomeComponent,
        getInitialProps: getInitialProps,
        routes: [
          {
            path: '/dogs',
            component: DogsComponent,
            exact: true,
          },
          {
            path: '/cats',
            component: CatsComponent,
            exact: true
          }
        ]
      },
    ]
  }

];
