import * as express from 'express';
export let router = express.Router();

router.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('respond with a resource');
});