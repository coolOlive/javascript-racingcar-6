import Input from "../view/Input.js";
import Output from "../view/Output.js";
import CarMoving from "../model/CarMoving.js";
import CarListCheck from "../validate/CarListCheck.js";
import TryNumberCheck from "../validate/TryNumberCheck.js";

class RacingCarController {
  constructor() {
    this.input = new Input();
    this.output = new Output();
    this.carMoving = new CarMoving();
    this.carListCheck = new CarListCheck();
    this.tryNumberCheck = new TryNumberCheck();
  }

  async start() {
    try {
      this.carNames = await this.setcarName();
      this.tryCount = await this.setTryNumber();
      this.winCount = Array.from({ length: this.carNames.length }, () => "");
      await this.randomStart();
      await this.printFinalResult(this.finalWinnerCount());
    } catch (error) {
      throw new Error(error);
    }
  }

  //자동차 이름 입력받기
  async setcarName() {
    return this.carListCheck.validate(await this.input.inputCarNames());
  }

  //게임 횟수 입력받기
  async setTryNumber() {
    return this.tryNumberCheck.validate(await this.input.inputTryNumber());
  }

  //게임 횟수만큼 랜덤값 생성
  async randomStart() {
    this.output.racingStartMessage();
    for (let i = 0; i < this.tryCount; i++) {
      this.countWinner(await this.carMoving.eachRound(this.winCount.length));
    }
  }

  //승리자 개수 증가시키기
  async countWinner(winner) {
    await winner.forEach((idx) => {
      this.winCount[idx] += "-";
    });
    this.printResultControll(this.carNames, this.winCount);
  }

  printResultControll(carNames, winCount) {
    this.output.eachRacingResult(carNames, winCount);
  }

  finalWinnerCount() {
    let totalWinnerCount = this.winCount.map((x) => x.length);
    let maxWinnerLength = Math.max(...totalWinnerCount);
    let idx = totalWinnerCount.indexOf(maxWinnerLength);
    let finalWinner = [];

    while (idx !== -1) {
      finalWinner.push(this.carNames[idx]);
      idx = totalWinnerCount.indexOf(maxWinnerLength, idx + 1);
    }
    return finalWinner;
  }

  printFinalResult(finalWinner) {
    this.output.finalResult(finalWinner);
  }
}

export default RacingCarController;
