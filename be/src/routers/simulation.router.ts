import { Request, Response, Router } from "express";
import { GeneratorService } from "../services/generator.service";
import { lotteryTypes } from "../data/lotteryType.data";

export const simulationRouter = (
	generatorService: GeneratorService,
) => {
	const generateNewLottery = async (req: Request, res: Response) => {
		const data = generatorService.generateLotteryRounds(10000, new Date(), lotteryTypes.lotto);
		return res.status(200).json(data);
	};

	return Router()
		.get("/", generateNewLottery);
};
