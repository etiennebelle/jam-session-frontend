# JAM!

## Description

JAM! it's a platform to help artists find jam sessions events near them and to let host publish jam sessions events to give them visibility and get artists play in them. 

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **User Signup:** As an anon I can sign up to the platform so that I can signup to play at jam session
-  **User Login:** As a user I can login to the platform so that I can see the jam sessions I signed up for and the past jam sessions I attended
-  **User Logout:** As a user I can logout from the platform so no one else can use it
-  **Host Signup:** As an anon I can sign up to the platform as a host so that I can create and publish jam session events 
-  **Host Login:** As a host I can login to the platform so that I can see the jam sessions I created, both upcoming and past
-  **Host Logout:** As a host I can logout from the platform so no one else can use it
-  **Create Jam Session** As a host I can create a jam session so that I can give it visibility and find artists to play in it 
-  **Jam Sessions** As an anon/user/host I want to see the published jam sessions
-  **Jam Sessions Details** As an anon/user/host I want to see details about a jam session, including other artists that will play in it and I want to be able to join it/leave it.
-  **Search Jam Sessions** As an anon/user/host I want to search jam sessions by name, city, host name, or text so that I know what's happening. Also, I want to be able to filter the jam sessions by date.
-  **Location Page** As an anon/user I want to see all events, past and upcoming of a specific location

## Backlog
- Add a filter of jam sessions based on the distance from my location
- Allow users and hosts to update their credentials
- Public profile for artists
- Allow artists to choose among more instruments, and to be able to select more than one instrument
- Google sign in

# Client

## Routes

# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       |                                | public `<Route>`            | Home page                                        |
| `/user/signup`            | UserSignupForm                 | anon only  `<IsAnonymous>`  | Signup form, link to login, navigate to profile after signup  |
| `/user/login`             | UserLoginFor                   | anon only `<IsAnonymous>`   | Login form, link to signup, navigate to profile after login   |
| `/user/profile`           |                                | user only `<IsPrivateUser>` | List of events signed up for (future and pasts)               |
| `/host/signup`            |                                | anon only  `<IsAnonymous>`  | Signup form, link to login, navigate to profile after signup  |
| `/host/login`             |                                | anon only `<IsAnonymous>`   | Login form, link to signup, navigate to profile after login   |
| `/host/profile`           | JamSessio                      | host only `<IsPrivateHost>` | List of events created (future and pasts), link to location   |
| `/host/create-jam-session`| JamSessionForm                 | host only `<IsPrivateHost>` | Form to create a jam session                                  |
| `/events`                 |                                | public `<Route>`            | Shows all jam sessions and allows search                      |
| `/events/:id`             | UserLoginFor                   | public `<Route>`            | Shows more details and allows artist to join                  |
| `/location/:id`           |                                | public `<Route>`            | Shows all jam sessions of that location (future and past)     |
          

## Components

- IsAnonymous

- IsPrivateHost

- IsPrivateUser

- Navbar

- UserLoginForm

- UserLoginComponent

- UserSignupForm

- JamSession

- JamSessionForm

- Event Card



## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout(user)
  - auth.login(host)
  - auth.signup(host)
  - auth.logout(host)



# Server / Backend

# Models

User model

```javascript
{
  username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    instrument: {
      type: [String],
    },
    jamSessions: [{type: Schema.Types.ObjectId, ref: 'JamSession'}]
}
```



Host model

```javascript
 {
   barName: {
        type: String, 
        trim: true, 
        required: true,
        unique: true
    },
    address: {
        type: String, 
        trim: true, 
        required: true,
        },
    email: {
        type: String, 
        required: true, 
        lowercase: true, 
        trim: true,
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    jamSessions: [{type: Schema.Types.ObjectId, ref: 'JamSession'}]
 }
```

Jam Sessions model

```javascript
 {
   jamSessionName: {
        type: String, 
        trim: true, 
        required: true,
    },
    date: {
        type: Date, 
        required: true,
    },
    time: {
        type: String, 
        required: true,
    },
    capacity: {
        type: Number, 
        required: true, 
    }, 
    genre: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }, 
    image: {
        type: String, 
        required: true
    }, 
    host: {type: Schema.Types.ObjectId, ref: 'Host'},
    players: [{type: Schema.Types.ObjectId, ref: 'User'}]
 }
```


## API Endpoints/Backend Routes
- POST /host/signup
  - body:
    - barName
    - address
    - email
    - password
- POST /host/login
  - body:
    - email
    - password
- GET /host/verify
- POST /jam-sessions
  - body:
    - jamSessionName, 
    - date, 
    - time, 
    - capacity, 
    - genre, 
    - description, 
    - host, 
    - players
- PUT /jam-sessions/:id
  - body:
    - formData
- DELETE /host/:id
    - host.data._id
- GET /host/:id
  - body: (empty)
- GET /host/:id/past-jam-sessions
  - body: (empty)
- POST /user/signup
  - body:
    - username
    - instrument
    - email
    - password
- POST /user/login
  - body:
    - email
    - password
- GET /user/verify
- GET /user/:id
  - body: (empty)
- GET /user/:id/past-jam-sessions
  - body: (empty)
- GET /events
  - body: (empty)
- GET /events/:id
  - body: (empty)
- PUT /events/:id
  - body: user.data._id
- DELETE /events/:id
  - body: user.data._id
- GET /locations
  - body: (empty)
- GET /locations/:id
  - body: (empty)
- GET /locations/:id/past-events
  - body: (empty)

## Links

### Git

[Client repository Link](https://github.com/etiennebelle/jam-session-frontend)

[Server repository Link](https://github.com/etiennebelle/jam-session-backend)

[Deployed App Link](https://j-a-m.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1VfJ9Rv6Xe9ke6bd0W6oOOcnF2sUL_BTDsqD4MPGHezU/edit#slide=id.g1a2bc0b4a8d_0_3)