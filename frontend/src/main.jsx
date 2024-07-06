import React from 'react'
import ReactDOM from 'react-dom/client'
import HRApplicantPage from './HRApplicantPage.jsx';
import HRInterviewPage from './HRInterviewPage.jsx';
import IndexPage from './IndexPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/HRApplicant",
    element: <HRApplicantPage></HRApplicantPage>
  },
  {
    path: "/HRInterviewPage",
    element: <HRInterviewPage></HRInterviewPage>
  },
  {
    path: "/",
    element:  <IndexPage></IndexPage>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
