import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaMagic,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import api from "../services/api";



function Login() {


  const navigate = useNavigate();

  const { login } = useAuth();




  const [formData, setFormData] = useState({

    email:"",

    password:"",

  });





  const [showPassword, setShowPassword] = useState(false);


  const [loading, setLoading] = useState(false);







  const handleChange = (e)=>{


    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });


  };








  const handleSubmit = async(e)=>{


    e.preventDefault();





    if(
      !formData.email ||
      !formData.password
    ){

      alert(
        "Please fill all fields."
      );

      return;

    }








    try{


      setLoading(true);





      const response = await api.post(

        "/auth/login",

        formData

      );







      login(

        response.data.user,

        response.data.token

      );







      navigate("/dashboard");







    }
    catch(error){



      console.log(error);



      alert(

        error.response?.data?.message ||

        "Login failed."

      );



    }
    finally{


      setLoading(false);


    }




  };









  return (


    <div className="auth-page">





      <div className="auth-card">





        <div className="auth-logo">

          <FaMagic />

        </div>







        <h1>

          Welcome Back

        </h1>






        <p>

          Login to continue creating AI images.

        </p>








        <form onSubmit={handleSubmit}>







          <div className="input-group">


            <FaEnvelope className="input-icon"/>



            <input


              type="email"

              name="email"

              placeholder="Email Address"

              value={formData.email}

              onChange={handleChange}


            />



          </div>









          <div className="input-group">



            <FaLock className="input-icon"/>





            <input


              type={
                showPassword
                ?
                "text"
                :
                "password"
              }


              name="password"


              placeholder="Password"


              value={formData.password}


              onChange={handleChange}


            />






            <button


              type="button"


              className="eye-btn"


              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }


            >


              {

                showPassword

                ?

                <FaEyeSlash />

                :

                <FaEye />

              }



            </button>






          </div>









          <button


            type="submit"


            className="auth-btn"


            disabled={loading}


          >


            {

              loading

              ?

              "Logging in..."

              :

              "Login"

            }



          </button>







        </form>









        <div className="auth-footer">


          Don't have an account?


          <Link to="/register">

            Register

          </Link>



        </div>






      </div>





    </div>


  );

}



export default Login;