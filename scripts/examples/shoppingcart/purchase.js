var parseResponse = require( './utils/response-parser' ).parseResponse;

var ShoppingCart = require( './models/ShoppingCart' );
var Order = require( './models/Order' );

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
            if( result == 'null' )
            {
                response.status( 400 ).send( "Shopping cart " + cartName + " does not exist" );
                return
            }

            var order = new Order( new ShoppingCart( parseResponse( result ) ) );

            Backendless.Persistence.of( Order ).save( order, new Backendless.Async(
                function( savedOrder )
                {
                    response.send( savedOrder );
                }, failureCallback ) );

        }, failureCallback ) );
};
