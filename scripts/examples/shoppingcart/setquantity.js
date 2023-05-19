var parseResponse = require( './utils/response-parser' ).parseResponse;

var ShoppingCart = require( './models/ShoppingCart' );

exports.run = function( request, response )
{
    var jsonBody = JSON.parse( request.body );
    var cartName = jsonBody.cartName;
    var productName = jsonBody.productName;
    var quantity = jsonBody.quantity;

    var failureCallback = function( fault )
    {
        response.status( 500 ).send( fault );
    };

    Backendless.Cache.get( cartName, new Backendless.Async(
        function( result )
        {
            var shoppingCart = new ShoppingCart( parseResponse( result ) );

            var shoppingItem = shoppingCart.getItemByProduct( productName );

            if( shoppingItem )
            {
                shoppingItem.quantity = quantity;

                Backendless.Cache.put( cartName, shoppingCart, new Backendless.Async(
                    function( result )
                    {
                        response.send( shoppingCart );
                    }, failureCallback ) );
            }
            else
            {
                response.status( 400 ).send( "No such product" );
            }
        }, failureCallback ) );
};
