const Package = require("../models/Package");

class PackageRepository {

  // ===========================
  // GET ALL PACKAGES
  // ===========================
  async getAllPackage() {
    try {
      const packages = await Package.findAll({
        attributes: [
          "id",
          "service_title",
          "title",
          "no_of_sessions",
          "slots",
          "mrp",
          "discount",
          "selling_price",
        ],
      });

      return {
        status: "success",
        result: packages,
      };

    } catch (error) {
      console.error("GET PACKAGE ERROR:", error);

      return {
        status: "error",
        result: error.message,
      };
    }
  }


  // ===========================
  // CREATE PACKAGE
  // ===========================
  async createPackage(data) {
    try {
      const existingPackage = await Package.findOne({
        where: { title: data.title },
      });

      if (existingPackage) {
        return {
          status: "conflict",
          result: "Package already exists",
        };
      }

      const newPackage = await Package.create(data);

      return {
        status: "success",
        result: newPackage,
      };

    } catch (error) {
      console.error("CREATE PACKAGE ERROR:", error);

      return {
        status: "error",
        result: error.message,
      };
    }
  }


  // ===========================
  // UPDATE PACKAGE
  // ===========================
  async updatePackage(id, data) {
    try {
      const pkg = await Package.findByPk(id);

      if (!pkg) {
        return {
          status: "fail",
          result: "Package not found",
        };
      }

      const updatedPackage = await pkg.update(data);

      return {
        status: "success",
        result: updatedPackage,
      };

    } catch (error) {
      console.error("UPDATE PACKAGE ERROR:", error);

      return {
        status: "error",
        result: error.message,
      };
    }
  }


  // ===========================
  // DELETE PACKAGE
  // ===========================
  async deletePackage(id) {
    try {
      const pkg = await Package.findByPk(id);

      if (!pkg) {
        return {
          status: "fail",
          result: "Package not found",
        };
      }

      await pkg.destroy();

      return {
        status: "success",
        result: "Package deleted successfully",
      };

    } catch (error) {
      console.error("DELETE PACKAGE ERROR:", error);

      return {
        status: "error",
        result: error.message,
      };
    }
  }

}

module.exports = new PackageRepository();