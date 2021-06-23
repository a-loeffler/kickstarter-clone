import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import EditorComponent from "./components/Editor";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp"

import MediaUpload from "./components/MediaUpload";
import LandingPage from "./components/LandingPage";

import './index.css'

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/" exact={true}>
          <Homepage />
        </Route>
        <Route path="/media-upload" exact={true}>
          <MediaUpload />
        </Route>
        <Route path="/landing-page" exact={true}>
          <LandingPage />
        </Route>
        <Route>
          <EditorComponent />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;


// return (
//   <BrowserRouter>
//     <NavBar />
//     <Switch>

//       <Route path="/login" exact={true}>
//         <LoginForm />
//       </Route>

//       <Route path="/sign-up" exact={true}>
//         <SignUpForm />
//       </Route>

//       <ProtectedRoute path="/users" exact={true}>
//         <UsersList/>
//       </ProtectedRoute>

//       <ProtectedRoute path="/users/:userId" exact={true}>
//         <User />
//       </ProtectedRoute>

//       <ProtectedRoute path="/" exact={true} >
//         <h1>My Home Page</h1>
//       </ProtectedRoute>

//     </Switch>
//   </BrowserRouter>
// );
// }
