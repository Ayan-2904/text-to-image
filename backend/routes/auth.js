import express from "express";

import {
  registerUser,
  loginUser,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/authController.js";


import protect from "../middleware/auth.js";


const router = express.Router();





/*
    POST /auth/register
*/
router.post(
  "/register",
  registerUser
);






/*
    POST /auth/login
*/
router.post(
  "/login",
  loginUser
);







/*
    PUT /auth/update-profile

    Protected Route
*/
router.put(
  "/update-profile",
  protect,
  updateProfile
);







/*
    PUT /auth/change-password

    Protected Route
*/
router.put(
  "/change-password",
  protect,
  changePassword
);








/*
    DELETE /auth/delete-account

    Protected Route
*/
router.delete(
  "/delete-account",
  protect,
  deleteAccount
);







export default router;