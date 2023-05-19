var parseResponse = require( './utils/response-parser' ).parseResponse;

var ShoppingCart = require( './models/ShoppingCart' );

exports.run = function( request, response )
{
    var cartName = JSON.parse( request.body ).cartName;

    var failureCallback = function( fault )
    {
        response.status( 500 ).send( fault );
    };

    Backendless.Cache.get( cartName, new Backendless.Async(
        function( result )
        {
            response.send( new ShoppingCart( parseResponse( result ) ).items );
        }, failureCallback ) );
};
