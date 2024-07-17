import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar></Navbar>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'create-post',
            element: <CreatePost></CreatePost>
        },
      ]
    },
  ]);

export default router;