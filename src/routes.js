import { HomeComponent } from './shared_components/home';
import { CatsComponent } from './shared_components/cats';
import { getPhrase, saySmthAction } from './modules/home'
import { sendAction } from './store';

const getInitialProps =() => {
  sendAction(saySmthAction('Привет с сервера'));
}

export const routes = [
  {
    path: '/',
    component: HomeComponent,
    exact: true,
    getInitialProps: getInitialProps
  },
  {
    path: '/cats',
    component: CatsComponent,
    exact: true
  }
];
