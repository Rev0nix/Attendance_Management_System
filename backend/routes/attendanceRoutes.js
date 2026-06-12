const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

// Test Route
router.get("/test", (req, res) => {
    res.json({
        message: "Attendance Route Working"
    });
});

// Mark Attendance (Teacher Only)
router.post(
    "/mark",
    authMiddleware,
    teacherMiddleware,
    async (req, res) => {

        try {

            const { studentId, status } = req.body;

            const attendance = new Attendance({
                studentId,
                status,
                markedBy: req.user.id
            });

            await attendance.save();

            res.status(201).json({
                message: "Attendance Marked Successfully"
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    }
);

// View Attendance of a Student
router.get(
    "/student/:studentId",
    authMiddleware,
    async (req, res) => {

        try {

            const attendance = await Attendance.find({
                studentId: req.params.studentId
            });

            res.json(attendance);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    }
);

// Attendance Percentage
router.get(
    "/percentage/:studentId",
    authMiddleware,
    async (req, res) => {

        try {

            const records = await Attendance.find({
                studentId: req.params.studentId
            });

            const totalClasses = records.length;

            const presentClasses = records.filter(
                record => record.status === "Present"
            ).length;

            const absentClasses =
                totalClasses - presentClasses;

            const percentage =
                totalClasses === 0
                    ? 0
                    : ((presentClasses / totalClasses) * 100);

            res.json({
                totalClasses,
                presentClasses,
                absentClasses,
                percentage: percentage.toFixed(2)
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    }
);

// Update Attendance

router.put(
    "/:attendanceId",
    authMiddleware,
    teacherMiddleware,
    async (req, res) => {

        try {

            const { status } = req.body;

            const attendance =
                await Attendance.findByIdAndUpdate(
                    req.params.attendanceId,
                    { status },
                    { new: true }
                );

            if (!attendance) {
                return res.status(404).json({
                    message: "Attendance Record Not Found"
                });
            }

            res.json({
                message: "Attendance Updated",
                attendance
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    }
);

// Delete Attendance

router.delete(
    "/:attendanceId",
    authMiddleware,
    teacherMiddleware,
    async (req, res) => {

        try {

            const attendance =
                await Attendance.findByIdAndDelete(
                    req.params.attendanceId
                );

            if (!attendance) {
                return res.status(404).json({
                    message: "Attendance Record Not Found"
                });
            }

            res.json({
                message: "Attendance Deleted Successfully"
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    }
);

// Attendance Report

router.get(
    "/report",
    authMiddleware,
    teacherMiddleware,
    async (req, res) => {

        try {

            const totalRecords =
                await Attendance.countDocuments();

            const presentCount =
                await Attendance.countDocuments({
                    status: "Present"
                });

            const absentCount =
                await Attendance.countDocuments({
                    status: "Absent"
                });

            res.json({
                totalRecords,
                presentCount,
                absentCount
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    }
);

router.get("/summary/:studentId", async (req, res) => {
  try {
    const records = await Attendance.find({
      studentId: req.params.studentId
    });

    const total = records.length;

    const present = records.filter(
      r => r.status === "Present"
    ).length;

    const absent = total - present;

    const percentage =
      total === 0 ? 0 : ((present / total) * 100);

    res.json({
      total,
      present,
      absent,
      percentage: percentage.toFixed(2)
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;