const express = require("express");
const router = express.Router();
//import express validator
const { body, validationResult } = require("express-validator");
//import database
const connection = require("../config/database");
/**
 * * INDEX Produk
 */
router.get("/", function (req, res) {
  //query
  connection.query("SELECT * FROM produk", function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "List Data Produk",
        data: rows,
      });
    }
  });
});

/**
 * SHOW Produk
 */
router.get("/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM produk WHERE id_produk = ${id}`,
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
          message: "Data Produk Not Found!",
        });
      }
      // if post found
      else {
        return res.status(200).json({
          status: true,
          message: "Detail Data Produk",
          data: rows[0],
        });
      }
    }
  );
});

/**
 * STORE Produk
 */
router.post(
  "/store",

  [
    //validation
    body("nama_produk").notEmpty(),
    body("deskripsi").notEmpty(),
    body("harga").notEmpty(),
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
      nama_produk: req.body.nama_produk,
      deskripsi: req.body.deskripsi,
      harga: req.body.harga,
    };
    // insert query
    connection.query(
      "INSERT INTO produk SET ?",
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
 * UPDATE Produk
 */
router.patch(
  "/update/:id",
  [
    //validation
    body("nama_produk").notEmpty(),
    body("deskripsi").notEmpty(),
    body("harga").notEmpty(),
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
      nama_produk: req.body.nama_produk,
      deskripsi: req.body.deskripsi,
      harga: req.body.harga,
    };
    // update query
    connection.query(
      `UPDATE produk SET ? WHERE id_produk = ${id}`,
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
 * DELETE Produk
 */
router.delete("/delete/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(
    `DELETE FROM produk WHERE id_produk = ${id}`,
    function (err, rows) {
      //if(err) throw err
      if (err) {
        console.log(`id produk ${id}`);
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        console.log(`id produk sukses ${id}`);
        return res.status(200).json({
          status: true,
          message: "Delete Data Successfully!",
        });
      }
    }
  );
});
module.exports = router;
