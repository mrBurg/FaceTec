import { Layout } from '@component/Layout';
import { AppPropsWithLayout } from '@component/Layout/@types';

function AppComponent(props: AppPropsWithLayout) {
  return <Layout {...props} />;
}

const App = AppComponent;

export default App;
