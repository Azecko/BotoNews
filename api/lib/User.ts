import { NextFunction, Request, Response } from 'express';
import { getUserByID, getUserByUsername, insertUser, deleteUser } from './DB';
const user = async (req: Request, res: Response, next: NextFunction) => {
  switch (req.method) {
    case 'GET':
      var error = {
            status_code: 400,
            error: "Please specify a valid username or a valid id."
        }
      if (!req.params.user_id_or_username) return res.status(400) && res.send(error);
      var param;

      if (/^\d+$/.test(req.params.user_id_or_username)) {
        param = parseInt(req.params.user_id_or_username as string);
        var user:any = await getUserByID(param);
        if (user.length == 0) return res.status(400) && res.send(error);
      }
      
      if (!/^\d+$/.test(req.params.user_id_or_username)) {
        var user:any = await getUserByUsername(req.params.user_id_or_username as string);
        if (user.length == 0) return res.status(400) && res.send(error);
      }
      res.status(201) && res.send(user[0]);
    break;
    case 'POST':
      var error = {
        status_code: 400,
        error: "Please specify a username and email."
      }
      if (!req.body || !req.body.username || !req.body.email) {
        return res.status(400) && res.send(error);
      }
      var insertedUser:any = await insertUser(req.body.username, req.body.email);
      var success = `{"status_code" : 201, "message": "User ${req.body.username} has been created.", "affected_rows" : ${insertedUser.affectedRows}}`;
      res.status(201) && res.send(JSON.parse(success));
    break;
    case 'DELETE':
      var error = {
        status_code: 400,
        error: "Please specify a username."
      }
      if (!req.body.username) return res.status(400) && res.send(error);
      var deletedUser:any = await deleteUser(req.body.username);
      var success = `{"status_code" : 200, "message": "User ${req.body.username} has been deleted.", "affected_rows" : ${deletedUser.affectedRows}}`;
      res.send(JSON.parse(success))
      
      break;
  }
};

export default user;
