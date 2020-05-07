const woocommerce = require( './woocommerce' );
const core        = require( '@actions/core' );

// most @actions toolkit packages have async methods
async function run() {
	try {
		woocommerce();
	} catch ( error ) {
		core.setFailed( error.message );
	}
}

run();
