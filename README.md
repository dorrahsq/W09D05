# Social media website
A social media website made In React and Node.js/Express with CRUD Functionality - [Take a look](https://socialmedia-website.netlify.app).


## Table of Contents
1. [ User Stories. ](#userStor)
2. [ Admin Stories. ](#adminSto)
3. [ UML diagrm.](#frontUml)
4. [ Routes. ](#frontRoutes)
4. [ Installation. ](#install)


<a name="userStor"></a>

## User Stories
As a user,  you can: 
- Signup (with Account Verification)
- Login
- Forget password and reset it
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
![Untitled Diagram drawio-4](https://user-images.githubusercontent.com/92247950/145673413-e02941e9-13da-4671-ba3d-8152291ac669.png)


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
