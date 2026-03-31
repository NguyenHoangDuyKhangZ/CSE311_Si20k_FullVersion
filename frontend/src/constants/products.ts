// Static voucher definitions (not managed by API yet)
export const vouchers = [
  {
    id: 1,
    code: 'WELCOME10',
    discountType: 'percent' as const,
    discount: 10,
    minOrder: 100000,
    description: '10% off for first order',
  },
  {
    id: 2,
    code: 'S50',
    discountType: 'fixed' as const,
    discount: 50000,
    minOrder: 1000000,
    description: '50,000 VND off orders from 1,000,000 VND',
  },
  {
    id: 3,
    code: 'SALE20',
    discountType: 'percent' as const,
    discount: 20,
    minOrder: 500000,
    maxDiscount: 500000,
    description: '20% off up to 500,000 VND',
  },
  {
    id: 4,
    code: 'SUMMER15',
    discountType: 'percent' as const,
    discount: 15,
    minOrder: 300000,
    description: '15% off on summer collection',
  },
];
