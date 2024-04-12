import express from "express";
import { postAppointment} from "../controller/appointmentController.js";
import { isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post",  postAppointment);
// router.get("/getall", isAdminAuthenticated, getAllAppointments);
// router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
// router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;