const MemberRepository = require("../repository/member.repository");

// GET /members
exports.getMember = async (req, res) => {
  try {
    const response = await MemberRepository.getAllMembers();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// POST /members
exports.createMember = async (req, res) => {
  try {
    const { name, email, mobile, dob, gender, status, blood_group, student } = req.body;
    if (!name || !email || !mobile || !dob || !gender || !status || !blood_group || !student) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const response = await MemberRepository.createMember({
      name,
      email,
      mobile,
      dob,
      gender,
      status,
      blood_group,
      student
    });
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// PUT /member/:id
exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMember = await MemberRepository.updateMember(id, req.body);
    if (!updatedMember)
      return res
        .status(404)
        .json({ status: "fail", message: "Member not found" });

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// DELETE /members/:id
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MemberRepository.deleteMember(id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: "fail", message: "Member not found" });

    res
      .status(200)
      .json({ status: "ok", message: "Member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
