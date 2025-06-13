import { GeistProvider, CssBaseline } from '@geist-ui/core';
import AppComponent from './AppComponent';

const App = () => (
  <GeistProvider>
    <CssBaseline /> 
    <AppComponent /> 
  </GeistProvider>
)

export default App;