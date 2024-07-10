import React from 'react'
import ReactDOM from 'react-dom/client'

import HRApplicantPage from './HRApplicantPage.jsx';
import HRInterviewPage from './HRInterviewPage.jsx';
import IndexPage from './IndexPage.jsx';
import CreatePostPage from './CreatePostPage';
import SendEmailPage from './SendEmailPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import SignInPage from './SignInPage.jsx';

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
    path: "/HRInterview",
    element: <HRInterviewPage></HRInterviewPage>
  },
  {
    path: "/CreatePost",
    element: <CreatePostPage></CreatePostPage>
  },
  {
    path: "/SendEmail",
    element: <SendEmailPage></SendEmailPage>
  },
  {
    path: "/",
    element:  <IndexPage></IndexPage>
  },
  {
    path: "/SignUp",
    element:  <SignUpPage></SignUpPage>
  },
  {
    path: "/SignIn",
    element:  <SignInPage></SignInPage>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
