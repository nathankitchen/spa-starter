import { StrictMode, type JSX } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import React from 'react';

var rootNode = document.getElementById('root');
if (!rootNode) {
  rootNode = document.createElement('div');
  rootNode.setAttribute('id', 'root');
  document.body.appendChild(rootNode);
}

const root = createRoot(rootNode);

declare global {
  interface Window {
    testcomponent: (p: any) => JSX.Element;
  }
}

window.testcomponent = function (p: any) { console.log(p);  return React.createElement('h1', {}, p.content); }

root.render(

  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);