import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '../store/product-slice';
import { AppRoutes } from '../../../helpers/navigation';
import { theme } from '@/components/global-styled';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { addToCart } from '@/features/carts/store/cart-slice';
import { ProductImage } from './product-image';

const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;

  &[data-card-hover]:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const Content = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 6px;

  @media (max-width: 768px) {
    padding: 10px;
    gap: 5px;
  }
`;

const Brand = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${theme.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.4px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.gray[800]};
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 1;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const CurrentPrice = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.primary[500]};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const OldPrice = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.gray[400]};
  text-decoration: line-through;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const DiscountTag = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary[500]};
  padding: 2px 6px;
  border-radius: 8px;

  @media (max-width: 768px) {
    font-size: 9px;
    padding: 2px 5px;
  }
`;

const StockStatus = styled.span<{ isLow: boolean; isOut: boolean }>`
  font-size: 11px;
  font-weight: 500;
  color: ${({ isLow, isOut }) =>
    isOut
      ? theme.colors.error.main
      : isLow
      ? theme.colors.warning.main
      : theme.colors.gray[600]};

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const CartButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.gray[300] : theme.colors.primary[500]};
  color: ${theme.colors.white};
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.primary[600]};
  }

  &:disabled {
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 7px;
    font-size: 12px;
    margin-top: 6px;
  }
`;

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { id, title, price, thumbnail, discountPercentage, stock, brand } = product;

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
    <Card data-card-hover onClick={handleClick}>
      <ProductImage src={thumbnail} alt={title} />
      <Content>
        <Brand>{brand}</Brand>
        <Title>{title}</Title>
        <PriceRow>
          <CurrentPrice>
            ${discountedPrice ? discountedPrice : price.toFixed(2)}
          </CurrentPrice>
          {discountedPrice && (
            <>
              <OldPrice>${price.toFixed(2)}</OldPrice>
              <DiscountTag>{Math.round(discountPercentage!)}% OFF</DiscountTag>
            </>
          )}
        </PriceRow>
        <StockStatus isLow={isLowStock} isOut={isOutOfStock}>
          {isOutOfStock
            ? 'Out of stock'
            : isLowStock
            ? `Only ${stock} left`
            : `In stock (${stock})`}
        </StockStatus>
        <CartButton onClick={handleAddToCart} disabled={isOutOfStock}>
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </CartButton>
      </Content>
    </Card>
  );
};