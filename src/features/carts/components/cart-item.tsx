import { Button, theme } from '@/components/global-styled';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppRoutes } from '../../../helpers/navigation';
import { CartItem as CartItemType, removeFromCart, updateQuantity } from '../store/cart-slice';

const ItemContainer = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.gray[200]};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${theme.radius.small};
  cursor: pointer;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 8px 0;
  }
`;

const ItemTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary[500]};
  }
`;

const ItemPrice = styled.p`
  font-size: 14px;
  color: ${theme.colors.gray[700]};
  margin: 0;
`;

const ItemPriceTotal = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: ${theme.colors.success.main};
  margin: 0;
  width: 100px;
  text-align: right;

  @media (max-width: ${theme.breakpoints.tablet}) {
    text-align: left;
  }
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: space-between;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[300]};
  cursor: pointer;
  user-select: none;

  &:first-of-type {
    border-top-left-radius: ${theme.radius.small};
    border-bottom-left-radius: ${theme.radius.small};
  }

  &:last-of-type {
    border-top-right-radius: ${theme.radius.small};
    border-bottom-right-radius: ${theme.radius.small};
  }

  &:hover {
    background-color: ${theme.colors.gray[200]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 28px;
  text-align: center;
  border: 1px solid ${theme.colors.gray[300]};
  border-left: none;
  border-right: none;
  font-size: 14px;

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

const RemoveButton = styled(Button)`
  padding: 6px 12px;
  font-size: 14px;
`;

const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      dispatch(
        updateQuantity({
          productId: item.productId,
          quantity: newQuantity,
        })
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      handleQuantityChange(value);
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.productId));
  };

  const navigateToProduct = () => {
    navigate(AppRoutes.shopDetail(item.productId));
  };

  const totalPrice = (item.price * item.quantity).toFixed(2);

  return (
    <ItemContainer>
      <ItemImage
        src={item.thumbnail}
        alt={item.title}
        onClick={navigateToProduct}
      />

      <ItemDetails>
        <ItemTitle onClick={navigateToProduct}>{item.title}</ItemTitle>
        <ItemPrice>${item.price.toFixed(2)} each</ItemPrice>
      </ItemDetails>

      <ItemActions>
        <QuantityControl>
          <QuantityButton
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </QuantityButton>
          <QuantityInput
            type="number"
            value={item.quantity}
            min={1}
            max={item.stock}
            onChange={handleInputChange}
          />
          <QuantityButton
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= item.stock}
          >
            +
          </QuantityButton>
        </QuantityControl>

        <RemoveButton $variant="danger" onClick={handleRemove}>
          Remove
        </RemoveButton>
      </ItemActions>

      <ItemPriceTotal>${totalPrice}</ItemPriceTotal>
    </ItemContainer>
  );
};

export default CartItem;
