export function formatNumberWithCommas(number: number) {
  return new Intl.NumberFormat().format(number);
}

export function formatPrice(price: number) {
  return price.toFixed(2);
}
