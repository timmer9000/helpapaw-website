function ShoppingItem( args )
{
    args = args || {};
    this.___class = 'ShoppingItem';
    this.product = args.product || "";
    this.price = args.price || 0.0;
    this.quantity = args.quantity || 0;
}

module.exports = ShoppingItem;
