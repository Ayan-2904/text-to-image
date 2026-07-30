import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { useAuth } from "../context/AuthContext";

import {
  FaUser,
  FaEnvelope,
} from "react-icons/fa";


function Profile() {


  const { user } = useAuth();



  return (


    <div className="dashboard">


      <Sidebar />



      <main className="dashboard-content">


        <Topbar />



        <div className="profile-page">



          <div className="profile-card">





            <div className="profile-avatar">


              {
                user?.name

                ?

                user.name
                .charAt(0)
                .toUpperCase()

                :

                "A"

              }


            </div>







            <h1>


              {
                user?.name || "User"
              }


            </h1>





            <p className="profile-role">

              AI Creator

            </p>









            <div className="profile-info">





              <div className="profile-item">


                <FaUser />


                <div>


                  <span>
                    Name
                  </span>


                  <h3>

                    {
                      user?.name ||
                      "Not Available"
                    }

                  </h3>


                </div>



              </div>









              <div className="profile-item">


                <FaEnvelope />


                <div>


                  <span>
                    Email
                  </span>


                  <h3>

                    {
                      user?.email ||
                      "Not Available"
                    }

                  </h3>


                </div>



              </div>





            </div>







          </div>




        </div>




      </main>



    </div>


  );

}


export default Profile;