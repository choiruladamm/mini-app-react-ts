import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '../store/product-slice';
import { AppRoutes } from '../../../helpers/navigation';
import {
  AspectRatioImage,
  Button,
  CoverImage,
  ElevatedCard,
  theme,
} from '@/components/global-styled';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { addToCart } from '@/features/carts/store/cart-slice';

const CardContainer = styled(ElevatedCard)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
`;

const ProductContent = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${theme.colors.gray[800]};

  /* Limit to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
`;

const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${theme.colors.success.main};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DiscountPrice = styled.span`
  font-size: 14px;
  color: ${theme.colors.gray[500]};
  text-decoration: line-through;
`;

const StockInfo = styled.div<{ isLowStock: boolean }>`
  font-size: 12px;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${(props) =>
    props.isLowStock ? theme.colors.warning.main : theme.colors.gray[600]};
`;

const AddButton = styled(Button)`
  margin-top: auto;
  width: 100%;
`;

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { id, title, price, thumbnail, discountPercentage, stock } = product;

  const isLowStock = stock <= 5;
  const isOutOfStock = stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate(AppRoutes.login);
      return;
    }

    if (!isOutOfStock) {
      dispatch(addToCart({ product, quantity: 1 }));
    }
  };

  const handleClick = () => {
    navigate(AppRoutes.shopDetail(id));
  };

  const getDiscountedPrice = () => {
    if (!discountPercentage) return null;
    const discountedPrice = price - price * (discountPercentage / 100);
    return discountedPrice.toFixed(2);
  };

  const discountedPrice = getDiscountedPrice();

  return (
    <CardContainer onClick={handleClick}>
      <AspectRatioImage>
        <CoverImage src={thumbnail} alt={title} />
      </AspectRatioImage>

      <ProductContent>
        <ProductName>{title}</ProductName>

        <ProductPrice>
          ${discountedPrice ? discountedPrice : price.toFixed(2)}
          {discountedPrice && (
            <DiscountPrice>${price.toFixed(2)}</DiscountPrice>
          )}
        </ProductPrice>

        <StockInfo isLowStock={isLowStock}>
          {isOutOfStock
            ? 'Out of stock'
            : isLowStock
            ? `Only ${stock} left`
            : `In stock (${stock})`}
        </StockInfo>

        <AddButton
          $variant="secondary"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </AddButton>
      </ProductContent>
    </CardContainer>
  );
};
