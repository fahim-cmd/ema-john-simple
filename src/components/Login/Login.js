import React, {useContext, useState} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);


function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''    
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName, 
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);      
      console.log(displayName,email)
    })
    .catch(err =>{
      console.log(err.message);
    })    
  }

  const handleFbSignIn = () => {
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // The signed-in user info.
      var user = result.user;
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;
      console.log(user)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
  
      // ...
    });
  }
  
  const handleSignOut = () => {
    firebase.auth().signOut()
    .then( res => {
      const signOUtUser = {
        isSignedIn: false,
        email: '',
        name: '',
        photo: '',        
        error: '',
        success: false
      }
      setUser(signOUtUser);
    })
    .catch( err => {

    })
  }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if(event.target.name === 'email'){
       isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = passwordHasNumber && isPasswordValid ; 
    }
    if(isFieldValid){
      const newUserInfo = {...user}
      newUserInfo [event.target.name] = event.target.value;
      setUser(newUserInfo);

    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        // Signed in 
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserInfo(user.name)
        // ...
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;        
        setUser(newUserInfo);       
        // ..
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        // Signed in 
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log(res)
        // ...
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;        
        setUser(newUserInfo);   
      });
    }
    e.preventDefault()  //submit button a click korlw jeno auto reload na hoy
  }
  
  const updateUserInfo = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name    
      }).then(() => {
        // Update successful.
        console.log('user name update successful')
      }).catch(error => {
        // An error happened.
        console.log('user name update failed')
      });
  }
  return (
    <div style={{textAlign: "center"}}>
       { user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
         <button onClick={handleSignIn}>Sign in</button>
       }
       <br/>
       <button onClick={handleFbSignIn}>fb sign in</button>
       {
         user.isSignedIn && <div> 
                               <p>welcome, {user.name}</p>
                               <p>Email : {user.email}</p>
                               <img src={user.photo} alt=""/>
                            </div> 
       }

       <h2>our own athentication</h2> 
       <input type="checkbox" name="newUser" onChange={ () => setNewUser(!newUser)} id=""/>
       <label htmlFor="newUser" >New user sign in</label>
       <form onSubmit={handleSubmit}>                  
          { newUser && <input name="name" onBlur={handleBlur} placeholder="Your name" type="text"/>}
          <br/>
          <input type="email" onBlur={handleBlur} name="email" placeholder="Your Email" required id=""/>
          <br/>
          <input type="password" onBlur={handleBlur} name="password" placeholder="Enter your password" required id=""/>
          <br/>
          <input type="submit" value={newUser ? "sign up" : "sign in"}/>
       </form>
       <p style={{color: "red"}}>{user.error}</p>
       {user.success && <p style={{color: "green"}}>User {newUser ? 'created' : 'Logged in'} successfully</p>}
    </div>
  );
}

export default Login;
