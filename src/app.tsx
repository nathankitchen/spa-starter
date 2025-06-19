import './App.css';
import { Link, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ExtensionProvider } from './components/ExtensionRegistry';

function App() {

  return (
    <ExtensionProvider>
      <div>
        <ul className='flex flex-row items-left p-7 rounded-2xl'>
          <li className='flex pr-4'><Link className='text-blue-500 hover:underline' to='/tool1'>Tool 1</Link></li>
          <li className='flex'><Link className='text-blue-500 hover:underline' to='/tool2'>Tool 2</Link></li>
        </ul>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </div>
    </ExtensionProvider>
  );
}

export default App;