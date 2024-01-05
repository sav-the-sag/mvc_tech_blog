// imports
const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");