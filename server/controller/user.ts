import { Request, Response } from "express";
import { User } from "../model/user";

export const createUsers = async (req: Request, res: Response) => {
  const data = req.body["data"];
  const { email, password } = data;

  try {
    const data = User.build({ email, password });
    const user = await data.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(500).send({ error: "something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  const data = req.body["data"];

  const { email, password } = data;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).send({ error: "invalid data" });
    }
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error: "something went wrong" });
  }
};
