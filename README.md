# Update Product Downloads

This action will update all product variations for a downloadable products within WooCommerce.

This is useful for automated releases of premium plugins that use WooCommerce for downloads.
 
## Usage
See the below example for usage. Best practice is to store the following data within secrets in your repo settings.

```yaml
  - name: Update Shop
    uses: linchpin/action-shop-product-updates@master
    with:
      woo_api_host: ${{ secrets.WOO_API_HOST }}
      woo_api_key: ${{ secrets.WOO_API_KEY }}
      woo_api_secret: ${{ secrets.WOO_API_SECRET }}
      woo_product_id: ${{ secrets.WOO_PRODUCT_ID }}
      woo_product_version: ${{ steps.get_version.outputs.VERSION }}
```
