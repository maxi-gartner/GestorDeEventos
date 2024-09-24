import express from "express";
import eventsController from "../controllers/eventsController.js";
import validator from "../validator/validator.js";
import eventSchema from "../validator/schemas/eventSchemaJoi.js";
import passport from "../middlewares/passport/passport.js";
const passportAuthenticate = passport.authenticate("jwt", { session: false });
import isOrganizer from "../middlewares/isOrganizer.js";
import isCreator from "../middlewares/IsCreator.js";
import isUser from "../middlewares/isUser.js";

const eventsRouter = express.Router();

eventsRouter.post(
  "/create",
  validator(eventSchema),
  passportAuthenticate,
  isOrganizer,
  eventsController.createEvent
);
eventsRouter.get("/:id", passportAuthenticate, eventsController.getOneEvent);
eventsRouter.put(
  "/update/:id",
  passportAuthenticate,
  isCreator,
  eventsController.updateEvent
);
eventsRouter.get("/", passportAuthenticate, eventsController.getEvents);
eventsRouter.delete("/:id", passportAuthenticate, eventsController.deleteEvent);
eventsRouter.post(
  "/register/:eventId",
  passportAuthenticate,
  isUser,
  eventsController.registerToEvent
);

eventsRouter.post(
  "/vote/:eventId",
  passportAuthenticate,
  eventsController.voteEvent
);

export default eventsRouter;
