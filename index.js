const invoice = require('./invoices.json'); // закомментировать если JSON заключен в квадратные скобки, см README
const Cost = require('./js/components/Cost');
const Credits = require('./js/components/Credits');
const Statement = require('./js/components/Statement');

// код на случай если JSON код заключен в квадратные скобки, см. README
//const invoiceInit = require('./invoices.json');
//const invoice = invoiceInit[0];

const cost = new Cost(invoice.performance);
const credits = new Credits(invoice);
const statement = new Statement(invoice.customer, cost.calcTotal(), credits.calcAllCredits());

console.log(statement.buildStatement());

