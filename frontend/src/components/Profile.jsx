import '../styles/Profile.css'
import { useState, useEffect, } from 'react';
import profile_Pic from '../assets/user.jpg'
import {  useNavigate, } from "react-router-dom";
import api from '../api';
import { toast } from 'react-toastify';


const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(profile_Pic);
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("api/user/profile/")
      .then((res) => {
        if (res.data.profile_picture) {
          setProfilePicture(res.data.profile_picture);
          setUsername(res.data.name);
        } else {
          console.log("Noprofile");
        }
      })
      .catch((err) => console.error(err));

  }, [])


  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_picture", file);

    api
      .patch("/api/user/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Profile picture updated!");
        setProfilePicture(res.data.profile_picture);
      })
      .catch((err) => toast.error("Failed to update profile picture" + err.message));
  };

  return (
    <div className="profile-container">
      <div className="hedding-container">
        <h1>welcome {username}</h1>
      </div>
      <div className="imgcontainer">
        <div className="image">
          <img src={`http://127.0.0.1:8000/${profilePicture}`} alt="Profile" />
        </div>
        <form className='picform' onSubmit={handleSubmit}>
          <input className="inputfile" name="file" id="file" type="file" onChange={handleImageChange} />
          <label htmlFor="file">Choose a file</label>
          <button type="submit">Change Profile Picture</button>
        </form>
      </div>
      <button onClick={()=>navigate('/logout')}>Logout</button>

    </div>
  )
}

export default Profile