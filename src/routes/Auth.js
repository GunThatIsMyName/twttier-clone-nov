import { useState } from "react";
import styled from "styled-components";
import { firebaseAuth, firebaseInstance } from "../firebase";

const Auth = () => {
  const newLogin = { id: "", password: "" };
  const [loginState, setLogin] = useState(newLogin);
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const handleLoginChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setLogin((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      if (newAccount) {
        data = await firebaseAuth.createUserWithEmailAndPassword(
          loginState.id,
          loginState.password
        );
      } else {
        data = await firebaseAuth.signInWithEmailAndPassword(
          loginState.id,
          loginState.password
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSocialLogin=async(e)=>{
    const {name}=e.target;
    let provider;
    if(name === "google"){
        provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    if(name==="github"){
        provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await firebaseAuth.signInWithPopup(provider);
    console.log(data,"data ")
  }
  return (
    <Wrppaer>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleLoginChange}
          value={loginState.id}
          name="id"
          type="text"
          placeholder="Login ID"
        />
        <input
          onChange={handleLoginChange}
          value={loginState.password}
          name="password"
          type="password"
          placeholder="Password"
        />
        <input
          type="submit"
          value={newAccount ? "create a Account" : "Login"}
        />
        <h4>{error}</h4>
      </form>
      <button onClick={() => setNewAccount((account) => !account)}>
        {newAccount ? "Have account" : "Create new Account"}
      </button>
      <br />
      <button name="google" onClick={handleSocialLogin} >Login with Google</button>
      <button name="github" onClick={handleSocialLogin} >Login with github</button>
    </Wrppaer>
  );
};

const Wrppaer = styled.section``;

export default Auth;
