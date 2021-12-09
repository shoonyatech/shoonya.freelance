
// todo : makeit more generalized

export const getBudgetLevel = (currencySymbol:string,maxLevel:number,rate:number,avgRate:number) => {
	if(rate > avgRate)
  return currencySymbol.repeat(maxLevel)
  if(rate < (avgRate * (2/5)))
  return currencySymbol
  else 
  return currencySymbol.repeat(maxLevel-1)
}
