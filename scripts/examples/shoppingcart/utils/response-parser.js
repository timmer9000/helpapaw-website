var parseStringResponse = function ( response )
{
    return typeof response === 'string' ? JSON.parse( response ) : response;
};

module.exports = {
    parseResponse: parseStringResponse
};