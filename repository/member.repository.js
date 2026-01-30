const Member = require("../models/Member");

class MemberRepository {
  // GET all members
  async getAllMembers() {
    try {
      const members = await Member.findAll();
      return {
        status: "ok",
        result: members,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // GET Member by ID
  async getMemberById(id) {
    try {
      const member = await Member.findByPk(id);
      if (!member) {
        return {
          status: "fail",
          result: "Member not found",
        };
      }

      return {
        status: "ok",
        result: member,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // CREATE Member
  async createMember(data) {
    try {
      const existingMember = await Member.findOne({
        where: { email: data.email },
      });

      if (existingMember) {
        return {
          status: "conflict",
          result: "Member already exists",
        };
      }

      const newMember = await Member.create(data);

      return {
        status: "success",
        result: newMember,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // UPDATE Member
  async updateMember(id, data) {
    try {
      const member = await Member.findByPk(id);
      if (!member) {
        return {
          status: "fail",
          result: "Member not found",
        };
      }

      const updatedMember = await member.update(data);
      return {
        status: "ok",
        result: updatedMember,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // DELETE Member
  async deleteMember(id) {
    try {
      const member = await Member.findByPk(id);
      if (!member) {
        return {
          status: "fail",
          result: "Member not found",
        };
      }

      await member.destroy();
      return {
        status: "ok",
        result: "Member deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
}

module.exports = new MemberRepository();
