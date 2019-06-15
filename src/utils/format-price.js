export function formatPrice(price) {
  return price
    ? Intl.NumberFormat('ko', {
        currency: 'KRW',
        style: 'currency',
      }).format(price)
    : '₩0';
}
