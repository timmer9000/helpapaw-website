var parseResponse = require( './utils/response-parser' ).parseResponse;

var ShoppingCart = require( './models/ShoppingCart' );

exports.run = function( request, response )
{
    var jsonBody = JSON.parse( request.body );
    var cartName = jsonBody.cartName;
    var productName = jsonBody.productName;

    var failureCallback = function( fault )
    {
        response.status( 500 ).send( fault );
    };

    Backendless.Cache.get( cartName, new Backendless.Async(
        function( result )
        {
            var shoppingCart = new ShoppingCart( parseResponse( result ) );

            if( shoppingCart.removeItemByProduct( productName ) )
            {
                Backendless.Cache.put( cartName, shoppingCart, new Backendless.Async(
                    function( result )
                    {
                        response.type( 'application/json' );
                        response.send( true );
                    }, failureCallback ) );
            }
            else
            {
                response.type( 'application/json' );
                response.send( false );
            }
        }, failureCallback ) );
};
