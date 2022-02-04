import { Router, Request } from "express";
import { createUsers, login } from "../controller/user";

const router = Router();

router.post("/user", createUsers);
router.post("/login", login);
router.post("/name", (req: Request, res: any) => {
  
  res.send({ name: "hello" });
});

router.get("/hello", (req: Request, res: any) => {
  
  res.send({ name: "hello!!!!!" });
});

export { router as userRouter };
