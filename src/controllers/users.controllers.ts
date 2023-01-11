import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.json({
    msg: "Get users -  controllers"
  })
}

export const postUser = (req: Request, res: Response) => {
  res.json({
    msg: "Post users -  controllers"
  })
}

export const putUser = (req: Request, res: Response) => {
  res.json({
    msg: "Put users -  controllers"
  })
}

export const patchUser = (req: Request, res: Response) => {
  res.json({
    msg: "patch users -  controllers"
  })
}

export const deleteUser = (req: Request, res: Response) => {
  res.json({
    msg: "delete users -  controllers"
  })
}
