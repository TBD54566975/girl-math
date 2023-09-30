/**
 * @param payinCurrency starting currency code that customer wants to convert to @param payoutCurrency
 * @param payoutCurrency currency code that customer wants to end up with
 * @param payinAmountSubunits amount subunits of @param payinCurrency being used to purchase @param payoutCurrency
 * @param payoutCurrencyUnitsPerPayinCurrencyUnit spot price of 1 whole @param payoutCurrency unit, in terms of @param payinCurency units.
 * @returns Number of @param payoutCurrency subunits that can be bought with @param payinAmountSubunits amount of @param payinCurency.
 */
export declare function calculatePayoutAmountSubunits(payinCurrency: string, payoutCurrency: string, payinAmountSubunits: number, payoutCurrencyUnitsPerPayinCurrencyUnit: string): bigint;
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