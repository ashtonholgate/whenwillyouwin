import { simulationRouter } from "./routers/simulation.router";
import { generatorService } from "./services/generator.service";

export const generatorServiceInstance = generatorService();

export const simulationRouterInstance = simulationRouter(
  generatorServiceInstance
);
