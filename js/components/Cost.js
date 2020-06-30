// Класс позволяет расчитать общую стоимость (totoalAmount) и стоимость каждой отдельной постановки (transcript)

// расценки на трагедии
const {
    tragedyBaseCost, tragedyAddViewerCost, tragedyAudienceThreshold,
} = require('../constants/tragedy');

// расценки на комедии
const {
	comedyBaseCost, comedyAdditionalCost, comedyBaseViewerCost, comedyAddViewerCost, comedyAudienceThreshold,
} = require('../constants/comedy');

class Cost {
    constructor(invoice) {
        this.invoice = invoice;
    }

    calcComedy(perf) {
        this.cost = comedyBaseCost + comedyBaseViewerCost * perf.audience;
        if (perf.audience > comedyAudienceThreshold) {
            this.cost += comedyAdditionalCost + comedyAddViewerCost * (perf.audience - comedyAudienceThreshold);
        }
        return this.cost;
    }

    calcTragedy(perf) {
        this.cost = tragedyBaseCost;
        if (perf.audience > tragedyAudienceThreshold) {
            this.cost += tragedyAddViewerCost * (perf.audience - tragedyAudienceThreshold);
        }
        return this.cost;
    }

    calcTotal() {
        this.totoalAmount = 0;
        this.transcript = [];
        for (let perf of this.invoice.performance) {
            switch (perf.type) {
                case 'tragedy':
                    this.totoalAmount += this.calcTragedy(perf);
                    break;
                case 'comedy':
                    this.totoalAmount += this.calcComedy(perf);
                    break;
                default:
                    throw new Error(`неизвестный тип: ${perf.type}`);
            }
            this.transcript.push([perf.playId, this.cost, perf.audience]);
        }
        return [this.totoalAmount, this.transcript];
    }
}

module.exports = Cost;