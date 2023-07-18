import { LotteryType } from "../models/lottery.models";

export const lotteryTypes: { [key: string]: LotteryType } = {
  test: {
    numbers: 6,
    bonusNumbers: 1,
    minNumber: 1,
    maxNumber: 59,
    minBonusNumber: 1,
    maxBonusNumber: 14,
    drawDays: [1,2,3,4,5],
  },
  lotto: {
    numbers: 6,
    bonusNumbers: 1,
    minNumber: 1,
    maxNumber: 59,
    minBonusNumber: 1,
    maxBonusNumber: 14,
    drawDays: [3, 6],
  },
  euromillions: {
    numbers: 5,
    bonusNumbers: 2,
    minNumber: 1,
    maxNumber: 50,
    minBonusNumber: 1,
    maxBonusNumber: 12,
    drawDays: [2, 5],
  },
  thunderball: {
    numbers: 5,
    bonusNumbers: 1,
    minNumber: 1,
    maxNumber: 39,
    minBonusNumber: 1,
    maxBonusNumber: 14,
    drawDays: [2, 3, 5, 6],
  },
};
