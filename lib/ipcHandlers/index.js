import { hono } from "./honoHandlers";
import { guest } from "./guestHandlers"

const handlers = {
  ...hono,
  ...guest
};

export default handlers;
