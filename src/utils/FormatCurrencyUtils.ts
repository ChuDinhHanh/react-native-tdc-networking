export const formatCurrency = (money: number, currency?: string) => {
  if (!currency) {
    return money.toLocaleString('vi-VN');
  } else {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency,
    }).format(Number(money));
  }
};
