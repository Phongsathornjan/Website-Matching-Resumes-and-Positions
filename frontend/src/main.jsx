import React from 'react'
import ReactDOM from 'react-dom/client'

import CreatePostPage from './HrPage/CreatePostPage';
import SendEmailPage from './HrPage/SendEmailPage.jsx';
import HrIndexPage from './HrPage/HrIndexPage';

import IndexPage from './nonUserPage/IndexPage.jsx';
import SignUpPage from './nonUserPage/SignUpPage.jsx';
import SignInPage from './nonUserPage/SignInPage.jsx';
import JobApplicationPage from './nonUserPage/JobApplicationPage.jsx';
import ResetPasswordPage from './nonUserPage/ResetPasswordPage.jsx';
import VerifyEmailPage from './nonUserPage/VerifyEmailPage.jsx';

import UserIndexPage from './UserPage/UserIndexPage.jsx';
import UserJobApplicationPage from './UserPage/userJobApplicationPage.jsx';
import UploadResumePage from './UserPage/UploadResumePage.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/CreatePost",
    element: <CreatePostPage></CreatePostPage>
  },
  {
    path: "/SendEmail",
    element: <SendEmailPage></SendEmailPage>
  },
  {
    path: "/HrIndexPage",
    element: <HrIndexPage></HrIndexPage>
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
  {
    path: "/JobApplication",
    element:  <JobApplicationPage></JobApplicationPage>
  },  
  {
    path: "/UserIndexPage",
    element:  <UserIndexPage></UserIndexPage>
  },
  {
    path: "/userJobApplication",
    element:  <UserJobApplicationPage></UserJobApplicationPage>
  },
  {
    path: "/UploadResumePage",
    element:  <UploadResumePage></UploadResumePage>
  },
  {
    path: "/ResetPasswordPage",
    element:  <ResetPasswordPage></ResetPasswordPage>
  },
  {
    path: "/VerifyEmailPage",
    element:  <VerifyEmailPage></VerifyEmailPage>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
