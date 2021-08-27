# Rinder

"Tinder" for restaurants

# Overview

## What is the problem you’re solving?
Group of users are indecisive of where to eat for dinner

## What is the solution?
Platform for group of users to like/dislike restaurants to narrow down a common interest

3. What is the MVP scope? (core features you must get working)
   Login page & profile
   Showcase a single restaurant to like/dislike
   Display the top voted restaurant/rankings of voted restaurants
   Like/dislike buttons
   Unit testing
4. What are the tough technical challenges involved with solving this problem?
   Managing/checking the swipe right/ swipe left ratio of multiple users
   Authentication (OAuth)
   Implementing unique sessions for users - creating special room IDs that users can access with a special room key
   Accessing information from location and restaurant APIs
5. What are the stretch goals?
   Giving user errors when forgetting something, listing menu/menu pictures, CSS (Chakra/Material-UI), Typescript(please), OAuth,
6. What is the technology stack?
   React
   Redux for persistent state management,
   React Hooks for temporary state management
   React Router
   Google Places API
   Webpack (build tool)
   Express for Backend,
   authentication (bcrypt, oauth?),
   PostgreSQL,
   Jest/Enzyme/SuperTest/Puppeteer
   Team Responsibility breakdown: Who’s working on which part?
   Faraz: Frontend/Floater
   Ted: Backend (Authentication, Testing)
   May: Backend/Floater
   Emma: Frontend/Floater
