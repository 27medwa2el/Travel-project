import { fakeProducts, Product } from '@/constants/mock-api';
import ProductForm from './product-form';

type TProductViewPageProps = {
  productId: string;
};

export default function ProductViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Product';

  if (productId !== 'new') {
    const data = fakeProducts.getProductById(Number(productId));
    product = data.product as Product;
    if (!product) {
      // In Pages Router, return null or a 404 component instead of calling notFound()
      return <div>Product not found</div>;
    }
    pageTitle = `Edit Product`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
