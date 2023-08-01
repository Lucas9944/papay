const assert = require("assert");
const Definer = require("../lib/mistake");
const Follow = require("../models/Follow");

const followController = module.exports;

followController.subscribe = async (req, res) => {
  try {
    console.log("POST: cont/subscribe");
    assert.ok(req.member, Definer.err_auth5);
    const follow = new Follow();

    const result = await follow.subscribeData(req.member, req.body);

    res.json({ state: "success", data: result });
  } catch (error) {
    console.log(`ERROR, cont/subscribe, ${error.message}`);
    res.json({ state: "fail", message: error.message });
  }
};

//unsubscribe

followController.unsubscibe = async (req, res) => {
  try {
    console.log("POST: cont/unsubscribe");
    assert.ok(req.member, Definer.err_auth5);

    const follow = new Follow();
    await follow.unsubscribeData(req.member, req.body);

    res.json({ state: "success", data: "unsubscribed" });
  } catch (error) {
    console.log(`ERROR, cont/subscribe, ${error.message}`);
    res.json({ state: "fail", message: error.message });
  }
};

followController.getMemberFollowings = async (req, res) => {
  try {
    console.log("GET: cont/getMemberFollowings");

    const follow = new Follow();
    const result = await follow.getMemberFollowingsData(req.query);
    res.json({ state: "success", data: result });
  } catch (error) {
    console.log(`ERROR, cont/subscribe, ${error.message}`);
    res.json({ state: "fail", message: error.message });
  }
};
followController.getMemberFollowers = async (req, res) => {
  try {
    console.log("GET: cont/getMemberFollowers");

    const follow = new Follow();
    const result = await follow.getMemberFollowersData(req.member, req.query);
    res.json({ state: "success", data: result });
  } catch (error) {
    console.log(`ERROR, cont/getMemberFollowers, ${error.message}`);
    res.json({ state: "fail", message: error.message });
  }
};
