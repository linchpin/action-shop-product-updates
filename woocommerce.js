const core               = require( '@actions/core' );
const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;
const api                = new WooCommerceRestApi( {
	url: core.getInput( 'woo_api_host' ),
	consumerKey: core.getInput( 'woo_api_key' ),
	consumerSecret: core.getInput( 'woo_api_secret' ),
	version: 'wc/v3',
	queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
} );

let woocommerce = function () {
	api.get( "products/" + parseInt( core.getInput( 'woo_product_id' ), 10 ) + "/variations" )
		.then( ( response ) => {

			// get our variations.
			let variations = response.data;

			// get out release date in the proper format
			let today = new Date();
			let dd    = String( today.getDate() ).padStart( 2, '0' );
			let mm    = String( today.getMonth() + 1 ).padStart( 2, '0' );
			let yyyy  = today.getFullYear();

			today = yyyy + '/' + mm + '/' + dd;

			// loop through our software and update accordingly
			variations.foreach( element => {

				let download_data = {
					meta_data: {
						'_api_last_updated': today,
						'_api_new_version': core.getInput('woo_product_version' )
					}
				};

				core.debug(`Updating Product ID: ${element.id}`);

				api.put( "products/" + parseInt( core.getInput( 'woo_product_id' ), 10 ) + "/variations/" + parseInt( element.id ), download_data )
					.then( ( response ) => {
						console.log( response.data );
					} )
					.catch( ( error ) => {
						core.setFailed( `Action failed with error ${error.response}` );
					} );
			} );

		} )
		.catch( ( error ) => {
			console.log( error.response );
			core.setFailed( `Action failed with error ${error.response}` );
		} );
};

module.exports = woocommerce;
