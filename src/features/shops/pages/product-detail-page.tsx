import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppRoutes } from '../../../helpers/navigation';
import {
  Button,
  Container,
  Flex,
  PageContainer,
  theme,
} from '@/components/global-styled';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { addToCart } from '@/features/carts/store/cart-slice';

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  color: ${theme.colors.gray[600]};
`;

const BreadcrumbLink = styled.span`
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary[500]};
    text-decoration: underline;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: ${theme.colors.gray[400]};
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 48px;

  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
  background-color: white;
  border-radius: ${theme.radius.default};
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.gray[300]};
    border-radius: 2px;
  }
`;

const Thumbnail = styled.img<{ isActive: boolean }>`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: ${theme.radius.small};
  cursor: pointer;
  opacity: ${(props) => (props.isActive ? 1 : 0.7)};
  border: 2px solid
    ${(props) => (props.isActive ? theme.colors.primary[500] : 'transparent')};
  transition: ${theme.transitions.default};

  &:hover {
    opacity: 1;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;

  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: 28px;
  }
`;

const ProductBrand = styled.div`
  color: ${theme.colors.gray[600]};
  font-size: 14px;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.success.main};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OldPrice = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.gray[500]};
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: ${theme.colors.success.main};
  padding: 2px 6px;
  border-radius: ${theme.radius.small};
`;

const StockInfo = styled.div<{ isLowStock: boolean }>`
  font-size: 14px;
  padding: 8px 0;
  font-weight: 500;
  color: ${(props) =>
    props.isLowStock ? theme.colors.warning.main : theme.colors.success.main};
`;

const ProductDescription = styled.p`
  color: ${theme.colors.gray[700]};
  margin: 16px 0;
  font-size: 16px;
  line-height: 1.6;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  gap: 16px;
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  color: ${theme.colors.gray[700]};
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[300]};
  cursor: pointer;
  font-size: 16px;
  user-select: none;

  &:first-of-type {
    border-top-left-radius: ${theme.radius.small};
    border-bottom-left-radius: ${theme.radius.small};
  }

  &:last-of-type {
    border-top-right-radius: ${theme.radius.small};
    border-bottom-right-radius: ${theme.radius.small};
  }

  &:hover:not(:disabled) {
    background-color: ${theme.colors.gray[200]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 36px;
  text-align: center;
  border: 1px solid ${theme.colors.gray[300]};
  border-left: none;
  border-right: none;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  /* Hide spinner buttons */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.products);
  const product = products.find((p) => p.id.toString() === id);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // If product exists, set the first image as selected
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  // Redirect if product not found
  // useEffect(() => {
  //   if (!id || (products.length > 0 && !product)) {
  //     navigate(AppRoutes.shop);
  //   }
  // }, [id, product, products.length, navigate]);

  if (!product) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '78vh',
          padding: '1rem',
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#1a1a1a',
              marginBottom: '1rem',
            }}
          >
            Product Not Found
          </h2>
          <p
            style={{
              color: '#666',
              marginBottom: '1.5rem',
            }}
          >
            The product you're looking for doesn't exist or has been removed.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => navigate(AppRoutes.shop)}>
              Return to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const {
    title,
    price,
    description,
    brand,
    stock,
    discountPercentage,
    thumbnail,
    images,
    category,
  } = product;

  const isLowStock = stock <= 5;
  const isOutOfStock = stock === 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      handleQuantityChange(value);
    }
  };

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      dispatch(addToCart({ product, quantity }));
    }
  };

  const getDiscountedPrice = () => {
    if (!discountPercentage) return null;
    const discountedPrice = price - price * (discountPercentage / 100);
    return discountedPrice.toFixed(2);
  };

  const discountedPrice = getDiscountedPrice();

  return (
    <PageContainer>
      <Container>
        <Breadcrumbs>
          <BreadcrumbLink onClick={() => navigate(AppRoutes.home)}>
            Home
          </BreadcrumbLink>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbLink onClick={() => navigate(AppRoutes.shop)}>
            Products
          </BreadcrumbLink>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <span>{title}</span>
        </Breadcrumbs>

        <ProductLayout>
          {/* Images Section */}
          <ImagesContainer>
            <MainImage src={selectedImage || thumbnail} alt={title} />
            {images && images.length > 1 && (
              <ThumbnailsContainer>
                {images.map((image, index) => (
                  <Thumbnail
                    key={index}
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    isActive={image === selectedImage}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </ThumbnailsContainer>
            )}
          </ImagesContainer>

          {/* Product Info Section */}
          <ProductInfo>
            <ProductTitle>{title}</ProductTitle>

            {brand && <ProductBrand>Brand: {brand}</ProductBrand>}

            <ProductPrice>
              ${discountedPrice ? discountedPrice : price.toFixed(2)}
              {discountedPrice && (
                <>
                  <OldPrice>${price.toFixed(2)}</OldPrice>
                  <Discount>{Math.round(discountPercentage!)}% OFF</Discount>
                </>
              )}
            </ProductPrice>

            <StockInfo isLowStock={isLowStock}>
              {isOutOfStock
                ? 'Out of stock'
                : isLowStock
                ? `Only ${stock} left in stock - order soon`
                : `In stock (${stock} available)`}
            </StockInfo>

            <ProductDescription>{description}</ProductDescription>

            {!isOutOfStock && (
              <QuantitySelector>
                <QuantityLabel>Quantity:</QuantityLabel>
                <QuantityControl>
                  <QuantityButton
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityInput
                    type="number"
                    value={quantity}
                    min={1}
                    max={stock}
                    onChange={handleInputChange}
                  />
                  <QuantityButton
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= stock}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>
              </QuantitySelector>
            )}

            <Flex gap="16px">
              <Button
                $variant="primary"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>

              <Button
                $variant="secondary"
                onClick={() => navigate(AppRoutes.shop)}
              >
                Continue Shopping
              </Button>
            </Flex>
          </ProductInfo>
        </ProductLayout>
      </Container>
    </PageContainer>
  );
};

export default ProductDetailPage;
