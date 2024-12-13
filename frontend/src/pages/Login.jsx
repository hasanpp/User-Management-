import { useNavigate } from "react-router-dom";
import Form from "../components/Form"
import { useEffect } from "react";
import { ACCESS_TOKEN } from "../constants"

const Login = () => {

  const navigate = useNavigate();

    useEffect(()=>{
        auth()
    }, [])


    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            navigate('/')
        } 
        
    }

  return (
    <Form route="/api/token/" method="login"/>
  )
}

export default Login