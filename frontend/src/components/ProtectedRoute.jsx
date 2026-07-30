import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";



function ProtectedRoute({ children }) {


  const {
    isAuthenticated,
    loading,
  } = useAuth();





  if (loading) {


    return (

      <div
        style={{
          minHeight:"100vh",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          background:"#0f172a",
          color:"#fff",
          fontSize:"24px"
        }}
      >

        Loading...

      </div>

    );


  }







  if (!isAuthenticated) {


    return (

      <Navigate

        to="/login"

        replace

      />

    );


  }







  return children;


}



export default ProtectedRoute;