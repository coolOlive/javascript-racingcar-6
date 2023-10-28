import { Random } from "@woowacourse/mission-utils";

class CarMoving {
  //자동차 개수만큼 랜덤 돌리기
  async eachRound(carCount) {
    this.winnerCount = new Array(carCount);
    for (let i = 0; i < carCount; i++) {
      this.winnerCount[i] = await this.eachCar();
    }
    return this.winnerNumber();
  }

  async eachCar() {
    return this.checkRandomNumber(await Random.pickNumberInRange(0, 9));
  }

  checkRandomNumber(racingNumber) {
    if (racingNumber >= 4) {
      return racingNumber;
    }
    return 0;
  }

  // 우승자의 인덱스 리턴
  winnerNumber() {
    let winner = [];
    let maxValue = Math.max(...this.winnerCount);
    let idx = this.winnerCount.indexOf(maxValue);

    while (idx !== -1) {
      winner.push(idx);
      idx = this.winnerCount.indexOf(maxValue, idx + 1);
    }

    return winner;
  }
}

export default CarMoving;
