import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaMagic,
} from "react-icons/fa";

import api from "../services/api";



function Register() {


  const navigate = useNavigate();




  const [formData, setFormData] = useState({

    name:"",
    email:"",
    password:"",
    confirmPassword:"",

  });





  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

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
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ){

      alert(
        "Please fill all fields."
      );

      return;

    }







    if(formData.password.length < 6){


      alert(
        "Password must be at least 6 characters."
      );


      return;


    }







    if(
      formData.password !==
      formData.confirmPassword
    ){


      alert(
        "Passwords do not match."
      );


      return;


    }









    try{


      setLoading(true);





      const response = await api.post(

        "/auth/register",

        {

          name:
          formData.name,


          email:
          formData.email,


          password:
          formData.password,

        }

      );





      alert(
        response.data.message
      );





      navigate("/login");





    }
    catch(error){


      console.log(error);


      alert(

        error.response?.data?.message ||

        "Registration failed."

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

          Create Account

        </h1>






        <p>

          Join AI Studio and create amazing images.

        </p>









        <form onSubmit={handleSubmit}>









          <div className="input-group">


            <FaUser className="input-icon"/>


            <input


              type="text"


              name="name"


              placeholder="Full Name"


              value={formData.name}


              onChange={handleChange}


            />



          </div>








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









          <div className="input-group">


            <FaLock className="input-icon"/>






            <input


              type={
                showConfirm

                ?

                "text"

                :

                "password"

              }


              name="confirmPassword"


              placeholder="Confirm Password"


              value={formData.confirmPassword}


              onChange={handleChange}


            />






            <button


              type="button"


              className="eye-btn"


              onClick={() =>
                setShowConfirm(
                  !showConfirm
                )
              }


            >


              {

                showConfirm

                ?

                <FaEyeSlash />

                :

                <FaEye />

              }



            </button>





          </div>









          <button


            className="auth-btn"


            type="submit"


            disabled={loading}


          >


            {

              loading

              ?

              "Creating Account..."

              :

              "Create Account"

            }



          </button>







        </form>









        <div className="auth-footer">


          Already have an account?


          <Link to="/login">

            Login

          </Link>



        </div>







      </div>







    </div>


  );

}



export default Register;