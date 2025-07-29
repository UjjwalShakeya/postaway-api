// importing required modules
import winston from "winston";

// configure winston right here

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(), // will set format
  defaultMeta: { service: "request-logging" }, // will indicate what service we are loggins our requests
  transports: [new winston.transports.File({ filename: "logs.txt" })], // will tell where to save all logs
});


const loggerMiddleware = async (req, res, next) => {
    // if url is not on signin or signup then only log data
  if (!(req.url.includes("signin")) && !(req.url.includes("signup"))) {
    // log data
    const logData = `${req.url} - ${JSON.stringify(req.body)}`
    // calling logger info with created logData
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;
