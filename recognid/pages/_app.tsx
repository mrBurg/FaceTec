import { Layout } from '@component/Layout';
import { TAppPropsWithLayout } from '@component/Layout/@types';

import 'normalize';
import '@scss/index.scss';

function AppComponent(props: TAppPropsWithLayout) {
  return (
    <>
      <Layout {...props} />
    </>
  );
}

const App = AppComponent;

export default App;
