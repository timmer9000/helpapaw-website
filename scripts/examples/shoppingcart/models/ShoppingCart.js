var ShoppingItem = require( './ShoppingItem' );

function ShoppingCart( args )
{
    args = args || {};
    this.___class = 'ShoppingCart';
    this.items = (args.items || []).map(
            function( item )
            {
                return new ShoppingItem( item );

            } ) || [];
}

ShoppingCart.prototype.add = function ( items )
{
    this.items.push.apply( this.items, items );
};

ShoppingCart.prototype.getItemByProduct = function( productName )
{
    for( var i = 0; i < this.items.length; i++ )
    {
        if( this.items[i].product == productName )
        {
            return this.items[i];
        }
    }

    return null;
};

ShoppingCart.prototype.removeItemByProduct = function( productName )
{
    var item = this.getItemByProduct( productName );
    if( item )
    {
        var index = this.items.indexOf( item );
        this.items.splice( index, 1 );
        return true;
    }
    else
    {
        return false;
    }
};

module.exports = ShoppingCart;
