import { Link,useNavigate } from "react-router-dom";
import styled from "styled-components";
import { firebaseAuth } from "../firebase";

const Navitation=()=>{
    const navigate = useNavigate();
    const handleSignOut=()=>{
        firebaseAuth.signOut();
        navigate("/")
    }
    return <Nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleSignOut} >logout</button>
    </Nav>
}
const Nav =styled.nav`
`;

export default Navitation;