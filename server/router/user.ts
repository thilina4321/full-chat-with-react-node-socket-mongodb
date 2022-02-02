import { Router } from "express";
import { createUsers, login } from "../controller/user";

const router = Router();

router.post("/user", createUsers);
router.post("/login", login);
router.get("/name", (req: any, res: any) => {
  res.send({ name: "hello" });
});

export { router as userRouter };
