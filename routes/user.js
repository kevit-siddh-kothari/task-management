const express = require('express')
const object = require('../controller/user')

//we can make just routes routes
const router = express.Router();    

// * Post Request
router.post("/", object.handlePostUsers);
  
  // * Get Request
  router.get("/", object.handleGetAllUsers);
  router.get("/:na", object.handleGetByIDUsers);
  
  // * Delete Request
  router.delete("/", object.handleDeleteAllUsers);
  router.delete("/:na", object.handleDeleteAllUsers);
  
  // * Patch Request
  router.patch('/:na', object.handlePatchUser)
  
module.exports = {
    router
}
