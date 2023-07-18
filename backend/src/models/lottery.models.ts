export type Round = {
    date: Date;
    numbers: number[];
    bonusNumbers: number[];
}

export type LotteryType = {
    numbers: number;
    bonusNumbers: number;
    minNumber: number;
    maxNumber: number;
    minBonusNumber: number;
    maxBonusNumber: number;
    drawDays: number[];
}