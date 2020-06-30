const {
    costFormat,
} = require('../constants/format');

class Statement {
    constructor(customer, cost, credits) {
        this.customer = customer;
        this.total = cost[0];
        this.transcript = cost[1];
        this.credits = credits;
    }

    buildStatement() {
        this.statement = `Счет для ${this.customer}\n`;
        for (let play of this.transcript) {
            this.statement += `${play[0]}: ${costFormat.format(play[1]/100)} (${play[2]} мест)\n`;
            this.statement += `Итого с вас ${costFormat.format(this.total/100)}\n`;
            this.statement += `Вы заработали ${this.credits} бонусов.\n`;
        }
        return this.statement;
    }
}

module.exports = Statement;
