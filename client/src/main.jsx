import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { Toaster } from './components/ui/toaster.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  // RecoilRoot is the root component for Recoil state management
  <RecoilRoot>
    <HashRouter>
      {/* QueryClientProvider provides React Query to the app */}
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <App />
      </QueryClientProvider>
    </HashRouter>
  </RecoilRoot>
);
