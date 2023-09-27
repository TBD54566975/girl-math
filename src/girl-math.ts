const BTC_SUBUNITS_PER_UNIT = 100000000
const BTC_SUBUNITS_SIG_DIGS = 8
const USD_SUBUNITS_PER_UNIT = 100
const USD_SUBUNITS_SIG_DIGS = 2
const KES_SUBUNITS_PER_UNIT = 100
const KES_SUBUNITS_SIG_DIGS = 2
const USDC_SUBUNITS_PER_UNIT = 100
const USDC_SUBUNITS_SIG_DIGS = 6

/**
 * TODO: double check that below param is sourceAmountSubunitsAfterFee and not sourceAmountSubunits
 * @param payoutAmountSubunitsAfterFee quote amount subunits being used to purchase target currency
 * @param priceOfPayoutCurrencyInPayinCurrency spot price of 1 whole payout currency, in terms of payin currency units.
 * @returns target amount subunits that can be bought with this amount of quote currency
 */
export function calculatePayoutAmountSubunits(payinCurrency: string, payoutCurrency: string, payoutAmountSubunitsAfterFee: number,
  priceOfPayoutCurrencyInPayinCurrency: string): bigint {
  const { subunitsPerUnit: sourceSubunitsPerUnit, } = getConversionConstants(payinCurrency)
  const { subunitsPerUnit: targetSubunitsPerUnit, } = getConversionConstants(payoutCurrency)
  const priceOfTargetInSourceStripped = parseFloat(priceOfPayoutCurrencyInPayinCurrency.replace(/,/g, ''))
  const priceOfTargetInSourceSubunits = priceOfTargetInSourceStripped * sourceSubunitsPerUnit
  const targetAmountUnits = payoutAmountSubunitsAfterFee / priceOfTargetInSourceSubunits
  const targetAmountSubunits = Math.floor(targetAmountUnits * targetSubunitsPerUnit)
  return BigInt(targetAmountSubunits)
}

export function calculatePayoutAmount(payinCurency: string, payinAmountSubunits: number,
  payoutUnitsPerPayinUnit: string): number {
  const payinAmountUnits = convertSubunitsToUnits(payinAmountSubunits, payinCurency)
  const payoutAmount = Number(payinAmountUnits) * Number(payoutUnitsPerPayinUnit)
  return payoutAmount
}

/**
 * Converts a number @param amountSubunits into a unit amount string, with a decimal point for overflow subunits.
 * @param amountSubunits amount subunits of @param currencyCode
 * @param currencyCode
 * @returns a whole unit amount with extra subunits after a decimal point
 */
export function convertSubunitsToUnits(amountSubunits: number, currencyCode: string): string {
  const { subunitsPerUnit, sigDigs } = getConversionConstants(currencyCode)

  const amountUnits = Math.floor(amountSubunits / subunitsPerUnit)
  const remainingSubunits = amountSubunits % subunitsPerUnit
  if (remainingSubunits === 0) {
    const subunitsString = '0'.repeat(sigDigs)
    return `${amountUnits}.${subunitsString}`
  }
  const remainingSubunitsString = remainingSubunits.toString()
  const subunitsLength = remainingSubunitsString.length
  let subunitsString
  if (remainingSubunitsString.length > sigDigs) {
    subunitsString = remainingSubunitsString.substring(0, sigDigs)
  } else {
    subunitsString = '0'.repeat(sigDigs - subunitsLength) + remainingSubunitsString
  }
  return `${amountUnits}.${subunitsString}`
}

export function convertUnitsToSubunits(amountUnits: string, currencyCode: string): string {
  const { sigDigs } = getConversionConstants(currencyCode)
  const unitWithoutCommas = amountUnits.replace(/[,]/g, '')

  let [majorSegment, minorSegment = ''] = unitWithoutCommas.split('.')
  const neededEndZeroes = '0'.repeat(sigDigs - minorSegment.length)

  if (majorSegment === '' || parseInt(majorSegment) == 0) {
    return minorSegment.replace(/^0+/, '') + neededEndZeroes
  }
  return majorSegment + minorSegment + neededEndZeroes
}

function getConversionConstants(currencyCode: string): {subunitsPerUnit: number, sigDigs: number} {
  switch (currencyCode) {
    case 'USDC':
      return { subunitsPerUnit: USDC_SUBUNITS_PER_UNIT, sigDigs: USDC_SUBUNITS_SIG_DIGS }
    case 'USD':
      return { subunitsPerUnit: USD_SUBUNITS_PER_UNIT, sigDigs: USD_SUBUNITS_SIG_DIGS }
    case 'BTC':
      return { subunitsPerUnit: BTC_SUBUNITS_PER_UNIT, sigDigs: BTC_SUBUNITS_SIG_DIGS }
    case 'KES':
      return { subunitsPerUnit: KES_SUBUNITS_PER_UNIT, sigDigs: KES_SUBUNITS_SIG_DIGS }
    default:
      throw Error(`unexpected currency [currency=${currencyCode}]`)
  }
}