var parseResponse = require( './utils/response-parser' ).parseResponse;

var ShoppingItem = require( './models/ShoppingItem' );
var ShoppingCart = require( './models/ShoppingCart' );

exports.run = function ( request, response )
{
    var jsonBody = JSON.parse( request.body );

    var cartName = jsonBody.cartName;

    var items = (jsonBody.items instanceof Array ? jsonBody.items : [jsonBody.item]).map(
        function ( item )
        {
            return new ShoppingItem( item );
        } );

    var failureCallback = function ( fault )
    {
        response.status( 500 ).send( fault );
    };

    Backendless.Cache.get( cartName, new Backendless.Async(
        function ( result )
        {
            var shoppingCart = new ShoppingCart( parseResponse( result ) );
            shoppingCart.add( items );

            Backendless.Cache.put( cartName, shoppingCart, new Backendless.Async(
                function ( result )
                {
                    response.send( shoppingCart );
                }, failureCallback ) );
        }, failureCallback ) );
};
