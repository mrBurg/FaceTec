import { Layout } from '@component/Layout';
import { AppPropsWithLayout } from '@component/Layout/@types';

import 'normalize';
import '@scss/index.scss';

function AppComponent(props: AppPropsWithLayout) {
  return (
    <>
      <Layout {...props} />
    </>
  );
}

const App = AppComponent;

export default App;
