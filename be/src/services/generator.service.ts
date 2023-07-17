import { LotteryType, Round } from "../models/lottery.models";
import { add } from "date-fns";

export const generatorService = () => {
  const generateLotteryRounds = (
    numberOfRounds: number,
    startingDate: Date,
    type: LotteryType
  ) => {
    const getNextDrawDate = (date: Date, type: LotteryType) => {
      const currentDay = date.getDay();
      const nextDrawDayIndex =
        (type.drawDays.findIndex((x) => x === currentDay) + 1) % type.drawDays.length;
      const nextDrawDay = type.drawDays[nextDrawDayIndex];
      const difference =
        nextDrawDay > currentDay
          ? nextDrawDay - currentDay
          : 7 - currentDay + nextDrawDay;
      return add(date, { days: difference });
    };

    const rounds: Round[] = [];
    let drawDate: Date = getNextDrawDate(startingDate, type);
    for (let i = 0; i < numberOfRounds; i++) {
      const round = generateRound(drawDate, type);
      rounds.push(round);
      drawDate = getNextDrawDate(drawDate, type);
    }
    return rounds;
  };
  const generateRound = (date: Date, type: LotteryType) => {
    const numberOfNumbers = type.numbers;
    const numberOfBonusNumbers = type.bonusNumbers;
    const round: Round = {
      date,
      numbers: [],
      bonusNumbers: [],
    };
    for (let i = 0; i < numberOfNumbers; i++) {
      round.numbers.push(
        generateRandomNumberWithinRange(
          type.minNumber,
          type.maxNumber,
          round.numbers
        )
      );
    }
    for (let i = 0; i < numberOfBonusNumbers; i++) {
      round.bonusNumbers.push(
        generateRandomNumberWithinRange(
          type.minBonusNumber,
          type.maxBonusNumber,
          round.numbers.concat(round.bonusNumbers)
        )
      );
    }
    round.numbers.sort((a, b) => a - b);
    round.bonusNumbers.sort((a, b) => a - b);
    return round;
  };
  const generateRandomNumberWithinRange = (
    min: number,
    max: number,
    exclusions: number[] = []
  ): number => {
    if (max - min + 1 <= exclusions.length) {
      throw new Error("The range is too small to generate a number within it.");
    }
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (exclusions.includes(randomNumber)) {
      return generateRandomNumberWithinRange(min, max, exclusions);
    }
    return randomNumber;
  };

  return {
    generateRound,
    generateLotteryRounds,
  };
};

export type GeneratorService = ReturnType<typeof generatorService>;
