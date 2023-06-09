export const getCartValues = (cartItems) => {
    const TotalValue = cartItems.reduce((x, y) => x + y.totalPrice, 0);
    const discount = cartItems.reduce((x, y) => x + (y.totalPrice * y.discount) / 100, 0);
    const packageCharges = cartItems.reduce((x, y) => x + y.packagingCharges, 0);
    const deliveryCharge = cartItems.reduce((x, y) => x + y.deliveryCharge, 0);
    const finalCartValue = TotalValue - discount + deliveryCharge + packageCharges;

    return {
        cartTotalValue: TotalValue,
        totalDiscount: Math.round( discount * 100 + Number.EPSILON ) / 100,
        totalDeliveryCharges: deliveryCharge,
        packagingCharges: packageCharges,
        finalCartValue: finalCartValue
    };
}