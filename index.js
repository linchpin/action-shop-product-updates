const core = require('@actions/core');
const wait = require('./woocommerce');

// most @actions toolkit packages have async methods
async function run() {
  try { 
	woocommerce();
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
