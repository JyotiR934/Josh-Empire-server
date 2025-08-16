const express=require("express");
const adminController = require("../controller/admin-controller");
const authmiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router=express.Router();
router.route("/users").get(authmiddleware,adminMiddleware,adminController.getAllUsers);
router.route("/user/:id").get(authmiddleware,adminMiddleware,adminController.getUserById);
router.route("/user/update/:id").patch(authmiddleware,adminMiddleware,adminController.updateUserById);
router.route("/users/delete/:id").delete(authmiddleware,adminMiddleware,adminController.deleteUserById);
router.route("/contacts").get(authmiddleware,adminMiddleware,adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authmiddleware,adminMiddleware,adminController.deleteContactById);
module.exports=router;