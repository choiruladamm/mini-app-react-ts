import {
  Button,
  Card,
  Container,
  Flex,
  PageContainer,
  theme,
} from '@/components/global-styled';
import { useAppSelector } from '@/hooks/use-app-selector';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppRoutes } from '../../../helpers/navigation';
import CartItem from '../components/cart-item';
import { SiteHead } from '@/components';

const CartHeader = styled.div`
  margin-bottom: 24px;
`;

const CartTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const CartEmpty = styled(Card)`
  padding: 48px;
  text-align: center;
`;

const CartEmptyText = styled.p`
  font-size: 16px;
  color: ${theme.colors.gray[600]};
  margin: 16px 0;
`;

const CartItems = styled(Card)`
  margin-bottom: 24px;
  overflow: hidden;
  padding: 0;
`;

const CartSummary = styled(Card)`
  padding: 24px;
`;

const SummaryRow = styled.div<{ total?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${(props) => (props.total ? '18px' : '14px')};
  font-weight: ${(props) => (props.total ? '600' : '400')};
  border-top: ${(props) =>
    props.total ? `1px solid ${theme.colors.gray[200]}` : 'none'};
  margin-top: ${(props) => (props.total ? '8px' : '0')};
  padding-top: ${(props) => (props.total ? '16px' : '8px')};
`;

const CheckoutButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  height: 48px;
`;

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <SiteHead title="Cart">
      <PageContainer>
        <Container>
          <CartHeader>
            <CartTitle>Your Cart</CartTitle>
          </CartHeader>

          {items.length === 0 ? (
            <CartEmpty>
              <h3>Your cart is empty</h3>
              <CartEmptyText>
                Looks like you haven't added any products to your cart yet.
              </CartEmptyText>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  $variant="primary"
                  onClick={() => navigate(AppRoutes.shop)}
                >
                  Continue Shopping
                </Button>
              </div>
            </CartEmpty>
          ) : (
            <Flex gap="24px" direction="column">
              <CartItems>
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </CartItems>

              <CartSummary>
                <h3>Order Summary</h3>
                <SummaryRow>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </SummaryRow>
                <SummaryRow total>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </SummaryRow>

                <CheckoutButton $variant="primary" disabled>
                  Checkout
                </CheckoutButton>

                <Button
                  $variant="secondary"
                  style={{ width: '100%', marginTop: '8px' }}
                  onClick={() => navigate(AppRoutes.shop)}
                >
                  Continue Shopping
                </Button>
              </CartSummary>
            </Flex>
          )}
        </Container>
      </PageContainer>
    </SiteHead>
  );
};

export default CartPage;
