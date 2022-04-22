// 金额 两位小数
export const amountReg = new RegExp(
  /^0(\.(0[1-9]|[1-9][0-9]{0,1}))?$|^([1-9]\d*)(\.[0-9]{1,2})?$/
)
export const nonZeroAmountReg = new RegExp(
  /^0(\.(0[1-9]|[1-9][0-9]{0,1}))$|^([1-9]\d*)(\.[0-9]{1,2})?$/
)
// 折扣率 两位正整数 0-9.9
export const discountReg = new RegExp(/^[1-9](\.\d)?$/)