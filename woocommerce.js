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

	core.debug( "products/" + parseInt( core.getInput( 'woo_product_id' ), 10 ) + "/variations" );

	// get out release date in the proper format
	let today = new Date();
	let dd    = String( today.getDate() ).padStart( 2, '0' );
	let mm    = String( today.getMonth() + 1 ).padStart( 2, '0' );
	let yyyy  = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;

	let download_data = {
		meta_data: [
			{
				'key' : '_api_last_updated',
				'value' : today
			},
			{
				'key' : '_api_new_version',
				'value' : core.getInput('woo_product_version' )
			}
		]
	};

	api.put( "products/" + parseInt( core.getInput( 'woo_product_id' ), 10 ), download_data )
		.then( ( response ) => {
			core.debug( 'Product Meta updated:' + core.getInput( 'woo_product_id' ) );
		} )
		.catch( ( error ) => {
			core.setFailed( `Product Meta failed with error ${error}` );
		} );
};

module.exports = woocommerce;
