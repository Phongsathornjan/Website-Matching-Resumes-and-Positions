import React from 'react'
import ReactDOM from 'react-dom/client'

import CreatePostPage from './HrPage/CreatePostPage';
import SendEmailPage from './HrPage/SendEmailPage.jsx';
import HrIndexPage from './HrPage/HrIndexPage';
import PostDetailPage from './HrPage/PostDetailPage.jsx';
import InsidePost from './HrPage/InsidePost.jsx';
import ResumePage from './HrPage/ResumePage.jsx';
import HrInformation from './HrPage/HrInformation.jsx';

import IndexPage from './nonUserPage/IndexPage.jsx';
import SignUpPage from './nonUserPage/SignUpPage.jsx';
import SignInPage from './nonUserPage/SignInPage.jsx';
import ResetPasswordPage from './nonUserPage/ResetPasswordPage.jsx';
import VerifyEmailPage from './nonUserPage/VerifyEmailPage.jsx';

import UserIndexPage from './UserPage/UserIndexPage.jsx';
import UserJobApplicationPage from './UserPage/userJobApplicationPage.jsx';
import UploadResumePage from './UserPage/UploadResumePage.jsx';
import SelectJobField from './nonUserPage/SelectJobField.jsx';
import UserInformation from './UserPage/UserInformation.jsx'

import AdminIndexPage from './adminPage/AdminIndexPage.jsx';
import CreateUserPage from './adminPage/CreateUserPage.jsx';

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
    path: "/SendEmail/:userId/:PostId",
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
  {
    path: "/PostDetail/:idPost", 
    element:  <PostDetailPage></PostDetailPage>
  },
  {
    path: "/InsidePost", 
    element:  <InsidePost></InsidePost>
  },
  {
    path: "/AdminIndexPage", 
    element:  <AdminIndexPage></AdminIndexPage>
  },
  {
    path: "/CreateUser", 
    element: <CreateUserPage></CreateUserPage>
  },
  {
    path: "/SelectJobFieldPage", 
    element: <SelectJobField></SelectJobField>
  },
  {
    path: "/Resume/:userId", 
    element: <ResumePage></ResumePage>
  },
  {
    path: "/MyInformation", 
    element: <UserInformation></UserInformation>
  },
  {
    path: "/HRInformation", 
    element: <HrInformation></HrInformation>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
