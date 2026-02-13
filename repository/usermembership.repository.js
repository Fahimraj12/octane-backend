const UserMembership = require("../models/UserMembership");

class UserMembershipRepository {
  // Get all user memberships
  async getAllUserMemberships() {
    try {
      const memberships = await UserMembership.findAll();
      return {
        status: "ok",
        result: memberships,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Create a new user membership
  async createUserMembership(data) {
    try {
      const newMembership = await UserMembership.create(data);
      return {
        status: "success",
        result: "newMembership created successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Update a user membership by ID
  async updateUserMembership(id, data) {
    try {
      const membershipRecord = await UserMembership.findByPk(id);
      if (!membershipRecord) {
        return {
          status: "fail",
          result: "User Membership not found",
        };
      }

      await membershipRecord.update(data);
      return {
        status: "success",
        result: "membershipRecord updated successfully",
      };
    }
    catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Delete a user membership by ID
  async deleteUserMembership(id) {
    try {
      const membershipRecord = await UserMembership.findByPk(id);
      if (!membershipRecord) {
        return {
          status: "fail",
          result: "User Membership not found",
        };
      }

      await membershipRecord.destroy();
      return {
        status: "success",
        result: "User Membership deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
}

module.exports = new UserMembershipRepository();