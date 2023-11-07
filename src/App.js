import { Console } from '@woowacourse/mission-utils';
import { PROPT_MESSAGE } from './constant/lottoConstants';
import LottoMachine from './classes/LottoMachine';
import LottoViewer from './classes/LottoViewer';
import Lotto from './classes/Lotto';
import LottoResultChecker from './classes/LottoResultChecker';

class App {
  #lottoMachine;

  #lotto;

  async #purchaseLotto() {
    // 사용자가 올바른 입력을 할때까지 do while 블럭을 통해 입력받는다.
    do {
      try {
        const purchaseAmount = await Console.readLineAsync(PROPT_MESSAGE.INPUT_PURCHASE_AMOUNT);
        this.#lottoMachine = new LottoMachine(purchaseAmount);
      } catch (error) {
        Console.print(error);
      }
    } while (!this.#lottoMachine);
  }

  async #EnterlottoNumbers() {
    // 사용자가 올바른 입력을 할때까지 do while 블럭을 통해 입력받는다.
    do {
      try {
        const lottoWinningNumber = await Console.readLineAsync(PROPT_MESSAGE.INPUT_WINNING_NUMBER);
        const lottoBonusNumber = await Console.readLineAsync(PROPT_MESSAGE.INPUT_BONUS_NUMBER);
        this.#lotto = new Lotto(lottoWinningNumber.split(','), lottoBonusNumber);
      } catch (error) {
        Console.print(error);
      }
    } while (!this.#lotto);
  }

  async play() {
    await this.#purchaseLotto();
    const boughtLottos = this.#lottoMachine.getLotto();
    LottoViewer.purchasedLottos(boughtLottos);
    await this.#EnterlottoNumbers();
    const { winningNumbers, bonusNumber } = this.#lotto.getWinningNumbers();
    const lottoResultChecker = new LottoResultChecker(winningNumbers, bonusNumber, boughtLottos);
    LottoViewer.winningResult(lottoResultChecker.getResult());
    LottoViewer.lottoProfitRate(lottoResultChecker.getProfitRate());
  }
}

export default App;
