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


<a name="wireframe"></a>
## Wireframes:
![Untitled Diagram drawio-9](https://user-images.githubusercontent.com/92247950/145771951-b7a7704f-edd6-4b40-8bc6-0745565e2b85.png)
-------
![Untitled Diagram drawio-10](https://user-images.githubusercontent.com/92247950/145771993-610fb6eb-a1db-4a06-bf8f-d0a741d8c51a.png)
-------
![Untitled Diagram drawio-8](https://user-images.githubusercontent.com/92247950/145772019-99817f77-92c3-42c9-8a4e-d1fc37db360c.png)
-------
![Untitled Diagram drawio-7](https://user-images.githubusercontent.com/92247950/145772067-4d2200e1-5695-447a-8412-b26ea670c366.png)







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
