import { lotteryTypes } from "../data/lotteryType.data";
import { exists } from "../utilities/value.utilities";
import { generatorService } from "./generator.service";

describe("generator service tests", () => {
  it("should generate a round successfully", () => {
    const generatorServiceInstance = generatorService();
    const date = new Date();
    const lottery = lotteryTypes.lotto;
    // generate 10000 rounds to make sure that the random number generator is working as expected
    const rounds = new Array(10000)
      .fill(0)
      .map(() => generatorServiceInstance.generateRound(date, lottery));
    rounds.forEach((round) => {
      expect(round.date).toBe(date);
      expect(round.numbers.length).toBe(lottery.numbers);
      expect(round.bonusNumbers.length).toBe(lottery.bonusNumbers);
      expect(
        round.numbers.every(
          (number) => number >= lottery.minNumber && number <= lottery.maxNumber
        )
      ).toBe(true);
      expect(
        round.bonusNumbers.every(
          (number) => number >= lottery.minBonusNumber && number <= lottery.maxBonusNumber
        )
      ).toBe(true);
    });
  });
  it("should generate a collection of rounds successfully", () => {
    const generatorServiceInstance = generatorService();
    const date = new Date();
    const lottery = lotteryTypes.lotto;
    const numberOfRounds = 10000;
    const rounds = generatorServiceInstance.generateLotteryRounds(
      numberOfRounds,
      date,
      lottery
    );
    expect(rounds.length).toBe(numberOfRounds);
    let lastDateSaw: Date | null = null;
    rounds.forEach((round) => {
      expect(round.date).toBeInstanceOf(Date);
      const lastDaySaw = exists(lastDateSaw) ? lastDateSaw.getDay() : null;
      if (exists(lastDaySaw)) {
        const expectedNextDayIndex = (lottery.drawDays.findIndex((x) => x === lastDaySaw) + 1) % lottery.drawDays.length;
        const expectedNextDay = lottery.drawDays[expectedNextDayIndex];
        expect(round.date.getDay()).toBe(expectedNextDay);
      }
      expect(lottery.drawDays).toContain(round.date.getDay());
    });
  });
});
