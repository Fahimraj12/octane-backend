const UserMembership = require("../models/UserMembership");
const MembershipPackage = require("../models/MembershipPackage");
const Member = require("../models/Member");
class UserMembershipRepository {

  static async getAllUserMemberships() {
    try {
      const data = await UserMembership.findAll({
        include: [
          { model: Member, as: "member" },
          { model: MembershipPackage, as: "membershipPackage" },
        ],
        order: [["createdAt", "DESC"]],
      });

      return { status: "success", result: data };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  static async getUserMembershipById(id) {
    try {
      const data = await UserMembership.findByPk(id);

      if (!data) {
        return { status: "fail", message: "Membership not found" };
      }

      return { status: "success", result: data };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  static async createUserMembership(payload) {
    try {
      const data = await UserMembership.create(payload);
      return { status: "success", result: data };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  static async updateUserMembership(id, payload) {
    try {
      const membership = await UserMembership.findByPk(id);

      if (!membership) {
        return { status: "fail", message: "Membership not found" };
      }

      await membership.update(payload);

      return { status: "success", result: membership };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  static async deleteUserMembership(id) {
    try {
      const membership = await UserMembership.findByPk(id);

      if (!membership) {
        return { status: "fail", message: "Membership not found" };
      }

      await membership.destroy();

      return { status: "success", message: "Membership deleted successfully" };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }
}

module.exports = UserMembershipRepository;