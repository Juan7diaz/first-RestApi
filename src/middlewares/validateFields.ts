import { Request, Response } from 'express';
import { validationResult } from 'express-validator'; // para validar los campos

// validationResult es una funcion que me trae los errores de los campos que se validaron en el router ( user.routes.ts )
// si no hay errores, entonces next() para que continue con el siguiente middleware
// si hay errores, entonces res.status(400).json(errors) para que se detenga y muestre los errores
// en el front se me va a poder ver un objeto con todos los errores que se generaron

export const validateFields = ( req:Request, res:Response, next:Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
}

