/**
 * @param payinCurrency starting currency code that customer wants to convert to @param payoutCurrency
 * @param payoutCurrency currency code that customer wants to end up with
 * @param payinAmountSubunits amount subunits of @param payinCurrency being used to purchase @param payoutCurrency
 * @param payinCurrencyUnitsPerPayoutCurrencyUnit price of 1 whole @param payoutCurrency unit, in terms of @param payinCurency units.
 * Say payin currency is USD, payout currency is BTC, the spot price would be written as 30,741.70 USD/BTC, so 30,741.70 would be this arg.
 * If payin currency is BTC, and payout currency is USD, the spot price would be written as 0.0000325291 BTC/USD, so 0.0000325291 would be this arg.
 * @returns Number of @param payoutCurrency subunits that can be bought with @param payinAmountSubunits amount of @param payinCurency.
 */
export declare function calculatePayoutAmountSubunitsWithPayinCurrencySpotPrice(payinCurrency: string, payoutCurrency: string, payinAmountSubunits: number, payinCurrencyUnitsPerPayoutCurrencyUnit: string): bigint;
/**
 * @param payinCurrency starting currency code that customer wants to convert to @param payoutCurrency
 * @param payoutCurrency currency code that customer wants to end up with
 * @param payinAmountSubunits amount subunits of @param payinCurrency being used to purchase @param payoutCurrency
 * @param payoutCurrencyUnitsPerPayinCurrencyUnit price of 1 whole @param payinCurency unit, in terms of @param payoutCurrency units.
 * Say payin currency is USD, payout currency is BTC, the spot price would be written as 0.0000325291 BTC/USD, so 0.0000325291 would be this arg.
 * If payin currency is BTC, and payout currency is USD, the spot price would be written as 30,741.70 USD/BTC, so 30,741.70 would be this arg.
 * @returns Number of @param payoutCurrency subunits that can be bought with @param payinAmountSubunits amount of @param payinCurency.
 */
export declare function calculatePayoutAmountSubunitsWithPayoutCurrencySpotPrice(payinCurrency: string, payoutCurrency: string, payinAmountSubunits: number, payoutCurrencyUnitsPerPayinCurrencyUnit: string): bigint;
/**
 * Converts a number @param amountSubunits into a unit amount string, with a decimal point for overflow subunits.
 * @param amountSubunits starting amount subunits of @param currencyCode
 * @param currencyCode referring to @param amountSubunits
 * @returns a whole unit amount of @param currencyCode with extra subunits after a decimal point
 */
export declare function convertSubunitsToUnits(amountSubunits: number, currencyCode: string): string;
/**
 * Converts a number @param amountUnits into a subunit amount string
 * @param amountUnits starting amount subunits of @param currencyCode
 * @param currencyCode referring to @param amountUnits
 * @returns subunits string of @param currencyCode that @param amountUnits contains
 */
export declare function convertUnitsToSubunits(amountUnits: string, currencyCode: string): string;
//# sourceMappingURL=girl-math.d.ts.map