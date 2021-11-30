import { useNavigate } from "react-router";
import { firebaseAuth } from "../firebase";

const Profile = ()=>{
    const navigate =useNavigate();
    const handleSignOut=()=>{
        firebaseAuth.signOut();
        navigate("/")
    }
    return <div>
        <h1>Profile</h1>
        <button onClick={handleSignOut}>logout</button>
    </div>
}

export default Profile;