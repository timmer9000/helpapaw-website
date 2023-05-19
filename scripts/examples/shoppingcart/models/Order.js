function Order( args )
{
    args = args || {};
    this.___class = 'Order';
    this.items = args.items || [];
    this.orderPrice = this.items.reduce(
        function( sum, item )
        {
            return sum + item.price;
        }, 0 ) ;
}

module.exports = Order;
