# Social media website (React and Express)
A social media website made In React and Node.js/Express with CRUD Functionality

## Table of Contents
1. [ User Stories. ](#userStor)
2. [ Admin Stories. ](#adminSto)
3. [ UML diagrm.](#frontUml)
4. [ Routes. ](#frontRoutes)
4. [ Installation. ](#install)


<a name="userStor"></a>

## User Stories
As a user,  you can: 
- Signup
- Login
- View the time line (others posts)
- View users profile
- View your profile with your posts
- Add a new post
- Update your post
- Delete your post
- Delete any comment on your post
- Write a comment on any post 
- Edit your comment
- Delete your comment 

<a name="adminSto"></a>

## Admin Stories
As an admin,  you can: 
- Login
- View users profile and posts
- Delete any user
- Delete any post
- Delete any comment


<a name="frontUml"></a>

## UML diagrm:


<a name="frontRoutes"></a>

## Routes
Component     |     Path              |  Permissions
------------- | ---------------       | ------------
Login         | `/`                   | everyone
SignUp        | `/signup`             | everyone
Forget        | `/forgetPassword`     | everyone
Reset         | `/resetPassword`      | everyone
Home          | `/home`               | user + admin 
Post          | `/home/post/:id`      | user + admin 
Profile       | `/profile`            | user + admin 
OneUser       | `/profile/:id`        | user + admin 
Users         | `/usres`              | admin only 

<a name="install"></a>

## Installation
- Clone this folder locally
- Install all packages using `npm install` command
- Run `npm start` in your command line