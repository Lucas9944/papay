const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake");
const View = require("../models/View");

const assert = require("assert");
const bcrypt = require("bcryptjs");
const {
  shapeIntoMongooseObjectId,
  lookup_auth_member_following,
  lookup_auth_member_liked,
} = require("../lib/config");
const Like = require("./Like");

class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  // singup of Member class

  async signupData(input) {
    try {
      const salt = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, salt);

      const new_member = new this.memberModel(input);

      let result;
      try {
        result = await new_member.save();
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1);
      }

      result.mb_password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginData(input) {
    try {
      const member = await this.memberModel
        .findOne(
          { mb_nick: input.mb_nick },
          { mb_nick: 1, mb_password: 1, _id: 0 }
        )
        .exec();

      assert.ok(member, Definer.err_auth3);

      const isMach = await bcrypt.compare(
        input.mb_password,
        member.mb_password
      );
      assert.ok(isMach, Definer.err_auth4);

      return await this.memberModel.findOne({ mb_nick: input.mb_nick }).exec();
      // console.log("member::::", member);
    } catch (err) {
      throw err;
    }
  }

  async getChosenMemberData(member, id) {
    try {
      const auth_member_id = shapeIntoMongooseObjectId(member._id);
      id = shapeIntoMongooseObjectId(id);
      console.log("member:::", member);
      const aggregateQuery = [
        { $match: { _id: id, mb_status: "ACTIVE" } },
        { $unset: "mb_password" },
      ];

      if (member) {
        // condition if not seen before
        await this.viewChosenItemByMember(member, id, "member");
        //check if auth member liked the chosen target
        aggregateQuery.push(lookup_auth_member_liked(auth_member_id));
        aggregateQuery.push(
          lookup_auth_member_following(auth_member_id, "members")
        );
      }
      const result = await this.memberModel.aggregate(aggregateQuery).exec();

      assert.ok(result, Definer.general_err2);
      console.log("aggregated result:::", result);
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  async viewChosenItemByMember(member, view_ref_id, group_type) {
    try {
      view_ref_id = shapeIntoMongooseObjectId(view_ref_id);
      const mb_id = shapeIntoMongooseObjectId(member._id);

      const view = new View(mb_id);
      const isValid = await view.validateChosenTarget(view_ref_id, group_type);
      assert.ok(isValid, Definer.general_err2);

      // logged user has seen target before
      const doesExist = await view.checkViewExistence(view_ref_id);
      console.log("doesExist", doesExist);

      if (!doesExist) {
        const result = await view.insertMemberView(view_ref_id, group_type);
        assert.ok(result, Definer.general_err1);
      }
      return true;
    } catch (err) {
      throw err;
    }
  }

  async likeChosenItemByMember(member, like_ref_id, group_type) {
    try {
      like_ref_id = shapeIntoMongooseObjectId(like_ref_id);
      const mb_id = shapeIntoMongooseObjectId(member._id);

      const like = new Like(mb_id);
      //validate target
      const isValid = await like.valideTargetItem(like_ref_id, group_type);

      assert.ok(isValid, Definer.general_err2);

      //doesExist

      const doesExist = await like.checkLikeExistence(like_ref_id);

      const data = doesExist
        ? await like.removeMemberLike(like_ref_id, group_type)
        : await like.insertMemberLike(like_ref_id, group_type);

      assert.ok(data, Definer.general_err1);

      const result = {
        like_group: data.like_group,
        like_ref_id: data.like_ref_id,
        like_status: doesExist ? 0 : 1,
      };
      return result;
    } catch (error) {
      throw error;
    }
  }
  async likeChosenItemByMember(member, like_ref_id, group_type) {
    try {
      like_ref_id = shapeIntoMongooseObjectId(like_ref_id);
      const mb_id = shapeIntoMongooseObjectId(member._id);

      const like = new Like(mb_id);
      //validate target
      const isValid = await like.valideTargetItem(like_ref_id, group_type);

      assert.ok(isValid, Definer.general_err2);

      //doesExist

      const doesExist = await like.checkLikeExistence(like_ref_id);

      const data = doesExist
        ? await like.removeMemberLike(like_ref_id, group_type)
        : await like.insertMemberLike(like_ref_id, group_type);

      assert.ok(data, Definer.general_err1);

      const result = {
        like_group: data.like_group,
        like_ref_id: data.like_ref_id,
        like_status: doesExist ? 0 : 1,
      };
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Member;
