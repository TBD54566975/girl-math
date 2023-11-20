const BTC_SUBUNITS_PER_UNIT = 100000000;
const BTC_SUBUNITS_SIG_DIGS = 8;
const USD_SUBUNITS_PER_UNIT = 100;
const USD_SUBUNITS_SIG_DIGS = 2;
const KES_SUBUNITS_PER_UNIT = 100;
const KES_SUBUNITS_SIG_DIGS = 2;
const USDC_SUBUNITS_PER_UNIT = 100;
const USDC_SUBUNITS_SIG_DIGS = 6;
/**
 * @param payinCurrency starting currency code that customer wants to convert to @param payoutCurrency
 * @param payoutCurrency currency code that customer wants to end up with
 * @param payinAmountSubunits amount subunits of @param payinCurrency being used to purchase @param payoutCurrency
 * @param payinCurrencyUnitsPerPayoutCurrencyUnit price of 1 whole @param payoutCurrency unit, in terms of @param payinCurency units.
 * @returns Number of @param payoutCurrency subunits that can be bought with @param payinAmountSubunits amount of @param payinCurency.
 */
export function calculatePayoutAmountSubunits(payinCurrency, payoutCurrency, payinAmountSubunits, payoutCurrencyUnitsPerPayinCurrencyUnit) {
    return calculatePayoutAmountSubunitsWithPayinCurrencySpotPrice(payinCurrency, payoutCurrency, payinAmountSubunits, payoutCurrencyUnitsPerPayinCurrencyUnit);
}
export function calculatePayoutAmountSubunitsWithPayinCurrencySpotPrice(payinCurrency, payoutCurrency, payinAmountSubunits, payinCurrencyUnitsPerPayoutCurrencyUnit) {
    const { subunitsPerUnit: payinSubunitsPerUnit, sigDigs: payinSigDigs } = getConversionConstants(payinCurrency);
    const { subunitsPerUnit: payoutSubunitsPerUnit, sigDigs: payoutSigDigs } = getConversionConstants(payoutCurrency);
    const payinUnitsPerPayoutUnitStripped = parseFloat(payinCurrencyUnitsPerPayoutCurrencyUnit.replace(/,/g, ''));
    const payinSubunitsPerPayoutUnit = payinUnitsPerPayoutUnitStripped * payinSubunitsPerUnit;
    const payoutAmountUnits = payinAmountSubunits / payinSubunitsPerPayoutUnit;
    const payoutAmountSubunits = Math.floor(payoutAmountUnits * payoutSubunitsPerUnit);
    return BigInt(payoutAmountSubunits);
}
/**
 * @param payinCurrency starting currency code that customer wants to convert to @param payoutCurrency
 * @param payoutCurrency currency code that customer wants to end up with
 * @param payinAmountSubunits amount subunits of @param payinCurrency being used to purchase @param payoutCurrency
 * @param payoutCurrencyUnitsPerPayinCurrencyUnit price of 1 whole @param payinCurency unit, in terms of @param payoutCurrency units.
 * @returns Number of @param payoutCurrency subunits that can be bought with @param payinAmountSubunits amount of @param payinCurency.
 */
export function calculatePayoutAmountSubunitsWithPayoutCurrencySpotPrice(payinCurrency, payoutCurrency, payinAmountSubunits, payoutCurrencyUnitsPerPayinCurrencyUnit) {
    const { subunitsPerUnit: payinSubunitsPerUnit, sigDigs: payinSigDigs } = getConversionConstants(payinCurrency);
    const { subunitsPerUnit: payoutSubunitsPerUnit, sigDigs: payoutSigDigs } = getConversionConstants(payoutCurrency);
    const payoutUnitPerPayinUnitsStripped = parseFloat(payoutCurrencyUnitsPerPayinCurrencyUnit.replace(/,/g, ''));
    const payoutUnitsPerPayinUnit = payinSubunitsPerUnit / payoutUnitPerPayinUnitsStripped;
    const payoutAmountUnits = payinAmountSubunits / payoutUnitsPerPayinUnit;
    const payoutAmountSubunits = Math.floor(payoutAmountUnits * payoutSubunitsPerUnit);
    return BigInt(payoutAmountSubunits);
}
/**
 * Converts a number @param amountSubunits into a unit amount string, with a decimal point for overflow subunits.
 * @param amountSubunits starting amount subunits of @param currencyCode
 * @param currencyCode referring to @param amountSubunits
 * @returns a whole unit amount of @param currencyCode with extra subunits after a decimal point
 */
export function convertSubunitsToUnits(amountSubunits, currencyCode) {
    const { subunitsPerUnit, sigDigs } = getConversionConstants(currencyCode);
    const amountUnits = Math.floor(amountSubunits / subunitsPerUnit);
    const remainingSubunits = amountSubunits % subunitsPerUnit;
    if (remainingSubunits === 0) {
        const subunitsString = '0'.repeat(sigDigs);
        return `${amountUnits}.${subunitsString}`;
    }
    const remainingSubunitsString = remainingSubunits.toString();
    const subunitsLength = remainingSubunitsString.length;
    let subunitsString;
    if (remainingSubunitsString.length > sigDigs) {
        subunitsString = remainingSubunitsString.substring(0, sigDigs);
    }
    else {
        subunitsString = '0'.repeat(sigDigs - subunitsLength) + remainingSubunitsString;
    }
    return `${amountUnits}.${subunitsString}`;
}
/**
 * Converts a number @param amountUnits into a subunit amount string
 * @param amountUnits starting amount subunits of @param currencyCode
 * @param currencyCode referring to @param amountUnits
 * @returns subunits string of @param currencyCode that @param amountUnits contains
 */
export function convertUnitsToSubunits(amountUnits, currencyCode) {
    const { sigDigs } = getConversionConstants(currencyCode);
    const unitWithoutCommas = amountUnits.replace(/[,]/g, '');
    let [majorSegment, minorSegment = ''] = unitWithoutCommas.split('.');
    const neededEndZeroes = '0'.repeat(sigDigs - minorSegment.length);
    if (majorSegment === '' || parseInt(majorSegment) == 0) {
        return minorSegment.replace(/^0+/, '') + neededEndZeroes;
    }
    return majorSegment + minorSegment + neededEndZeroes;
}
function getConversionConstants(currencyCode) {
    switch (currencyCode) {
        case 'USDC':
            return { subunitsPerUnit: USDC_SUBUNITS_PER_UNIT, sigDigs: USDC_SUBUNITS_SIG_DIGS };
        case 'USD':
            return { subunitsPerUnit: USD_SUBUNITS_PER_UNIT, sigDigs: USD_SUBUNITS_SIG_DIGS };
        case 'BTC':
            return { subunitsPerUnit: BTC_SUBUNITS_PER_UNIT, sigDigs: BTC_SUBUNITS_SIG_DIGS };
        case 'KES':
            return { subunitsPerUnit: KES_SUBUNITS_PER_UNIT, sigDigs: KES_SUBUNITS_SIG_DIGS };
        default:
            throw Error(`unexpected currency [currency=${currencyCode}]`);
    }
}
//# sourceMappingURL=girl-math.js.map
