const express = require("express");
const router = express.Router();
//import express validator
const { body, validationResult } = require("express-validator");
//import database
const connection = require("../config/database");
/**
 * * INDEX Petugas
 */
router.get("/", function (req, res) {
  //query
  connection.query("SELECT * FROM petugas", function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "List Data Petugas",
        data: rows,
      });
    }
  });
});
/**
 * SHOW Petugas
 */
router.get("/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM petugas WHERE id_petugas = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      }
      // if post not found
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: "Data Petugas Not Found!",
        });
      }
      // if post found
      else {
        return res.status(200).json({
          status: true,
          message: "Detail Data Petugas",
          data: rows[0],
        });
      }
    }
  );
});

/**
 * STORE Petugas
 */
router.post(
  "/store",
  [
    //validation
    body("nama_petugas").notEmpty(),
    body("username").notEmpty(),
    body("password").notEmpty(),
    body("level").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    //define formData
    let formData = {
      nama_petugas: req.body.nama_petugas,
      username: req.body.username,
      password: req.body.password,
      level: req.body.level,
    };
    // insert query
    connection.query(
      "INSERT INTO petugas SET ?",
      formData,
      function (err, rows) {
        //if(err) throw err
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(201).json({
            status: true,
            message: "Insert Data Successfully",
            data: rows[0],
          });
        }
      }
    );
  }
);

/**
 * UPDATE Petugas
 */
router.patch(
  "/update/:id",
  [
    //validation
    body("nama_petugas").notEmpty(),
    body("username").notEmpty(),
    body("password").notEmpty(),
    body("level").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    //id post
    let id = req.params.id;
    //data post
    let formData = {
      nama_petugas: req.body.nama_petugas,
      username: req.body.username,
      password: req.body.password,
      level: req.body.level,
    };
    // update query
    connection.query(
      `UPDATE petugas SET ? WHERE id_petugas = ${id}`,
      formData,
      function (err, rows) {
        //if(err) throw err
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Update Data Successfully!",
          });
        }
      }
    );
  }
);

/**
 * DELETE Petugas
 */
router.delete("/delete/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(
    `DELETE FROM petugas WHERE id_petugas = ${id}`,
    function (err, rows) {
      //if(err) throw err
      if (err) {
        console.log(`id petugas ${id}`);
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        console.log(`id petugas sukses ${id}`);
        return res.status(200).json({
          status: true,
          message: "Delete Data Successfully!",
        });
      }
    }
  );
});
module.exports = router;
