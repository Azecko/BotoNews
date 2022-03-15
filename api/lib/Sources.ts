import { NextFunction, Request, Response } from 'express';
import { getAllSources, getSourceByID, getSourceByName } from './DB';
      var error = {
        status_code: 400,
        error: "Please specify a valid source name or a valid source id."
      }
      let sources:any;
      if(req.path.includes("/sources")) {
        sources = await getAllSources();
      } else {
        if (!req.params.source_id_or_name) return res.status(400) && res.send(error);

        var param;

        if (/^\d+$/.test(req.params.source_id_or_name)) {
          param = parseInt(req.params.source_id_or_name as string);
          sources = await getSourceByID(param);
          if (sources.length == 0) return res.status(400) && res.send(error);
        }
        
        if (!/^\d+$/.test(req.params.source_id_or_name)) {
          sources = await getSourceByName(req.params.source_id_or_name as string);
          if (sources.length == 0) return res.status(400) && res.send(error);
        }
      }
      res.status(200) && res.send(sources);
};

export default user;
