// var multer = require("multer")();
import express, { response } from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
const upload =multer()
import path from "path";

const router = express.Router()

router.post("/leave_post", upload.any(), async (req, res) => {
   const data =[
    req.body.emp_id,
    req.body.emp_name,
    req.body.description,
    req.body.approval,
   ]
    console.log(data);
    const sql = "INSERT INTO `leave` (emp_id, emp_name, description, approval) VALUES (?)";

    con.query(sql, [data], (err, result) => {
        if (err) return res.json({ Status: false, Error: err })

        return res.json({ Status: true })
    })
    // res.send(data)
    
})
router.get('/leave_get', (req, res) => {
    const sql = "SELECT * FROM `leave`";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: err})
        return res.json({ Status: true, Result: result })
    })
})

router.put('/leave_update/:id',upload.any(), (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE \`leave\` 
        set approval = ? Where id = ?`
    const values = [
        req.body.approval,
       
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

export { router as Leave }