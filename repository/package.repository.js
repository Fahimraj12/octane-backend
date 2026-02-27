const Package = require("../models/Package");

class PackageRepository {
  // GET all packages
  async getAllPackage() {
    try {
      const pkg = await Package.findAll({
        attributes: [
          "id",
          "service_category",
          "title",
          "duration_in_days",
          "no_of_sessions",
          "short_description",
          "mrp_price",
          "discount_price",
          "gst_percentage",
          "image",
          "package_includes",
          "appointment_slot_minutes",
          "appointment_start",
          "appointment_end",
          "blocked_start",
          "blocked_end",
          "week_days",
          "status"
        ],

      });

      return {
        status: "success",
        result: pkg,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // CREATE package
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
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // UPDATE package
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
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // DELETE package
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
        status: "ok",
        result: "Package deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
}

module.exports = new PackageRepository();