import { logout } from '@/features/auth/store/auth-slice';
import { setSearchQuery } from '@/features/shops/store/product-slice';
import { AppRoutes } from '@/helpers/navigation';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Badge, Container, Flex, theme } from './global-styled';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${theme.colors.gray[50]};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  box-shadow: ${theme.shadows.small};
  padding: 15px 0;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.primary[600]};
  white-space: nowrap;
  cursor: pointer;
`;

const SearchBar = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 30px;
  position: relative;
  width: 100%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
    width: 100%;
    margin: 0;
  }
`;

const WrapperMobile = styled.div`
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    width: 100%;
    padding-top: 0.7rem;
  }
`;

const WrapperDesktop = styled.div`
  display: block;
  flex: 1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 15px;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  transition: ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[400]};
    box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
  }

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  color: ${theme.colors.primary[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &:hover {
    color: ${theme.colors.primary[700]};
  }
`;

const CartIcon = styled(IconButton)`
  svg {
    width: 24px;
    height: 24px;
  }
`;

const UserIcon = styled(IconButton)`
  svg {
    width: 24px;
    height: 24px;
  }
`;

const CartBadge = styled(Badge)`
  position: absolute;
  top: -8px;
  right: -8px;
`;

const AuthLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const AuthLink = styled.span`
  color: ${theme.colors.primary[600]};
  font-weight: 500;
  cursor: pointer;
  transition: ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary[700]};
    text-decoration: underline;
  }
`;

const MobileSearchButton = styled(IconButton)`
  display: none;
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const MobileSearchOverlay = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  justify-content: center;
  align-items: flex-start;
  padding-top: 64px;
`;

const MobileSearchContainer = styled.div`
  width: 90%;
  max-width: 500px;
  background-color: white;
  border-radius: ${theme.radius.default};
  padding: 16px;
  box-shadow: ${theme.shadows.large};
`;

const MobileSearchInput = styled(SearchInput)`
  border-radius: ${theme.radius.default};
`;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const [searchValue, setSearchValue] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Debounce function
  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: any
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced search dispatch
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query));
      if (query) {
        navigate(AppRoutes.shop);
      }
    }, 300),
    [dispatch, navigate]
  );

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  // Close mobile search when navigating
  useEffect(() => {
    setMobileSearchOpen(false);
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(AppRoutes.login);
  };

  return (
    <HeaderContainer>
      <Container>
        <Flex justify="space-between" align="center">
          <Logo onClick={() => navigate(AppRoutes.shop)}>My Shop</Logo>

          <WrapperDesktop>
            <SearchBar style={{width: '100%'}}>
              <SearchInput
                type="text"
                placeholder="Cari di My Shop..."
                value={searchValue}
                onChange={handleSearchChange}
                style={{ width: '100%' }}
              />
            </SearchBar>
          </WrapperDesktop>

          <ActionButtons>
            <CartIcon onClick={() => navigate(AppRoutes.cart)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
            </CartIcon>

            <MobileSearchButton onClick={() => setMobileSearchOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </MobileSearchButton>

            {isAuthenticated ? (
              <Flex align="center" gap="12px">
                <UserIcon onClick={() => {}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </UserIcon>
                <AuthLink onClick={handleLogout}>Logout</AuthLink>
              </Flex>
            ) : (
              <AuthLinks>
                <AuthLink onClick={() => navigate(AppRoutes.login)}>
                  Login
                </AuthLink>
                <AuthLink onClick={() => navigate(AppRoutes.register)}>
                  Register
                </AuthLink>
              </AuthLinks>
            )}
          </ActionButtons>
        </Flex>

        {/* <WrapperMobile>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Cari di My Shop..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </SearchBar>
        </WrapperMobile> */}
      </Container>

      <MobileSearchOverlay
        isOpen={mobileSearchOpen}
        onClick={() => setMobileSearchOpen(false)}
      >
        <MobileSearchContainer onClick={(e) => e.stopPropagation()}>
          <MobileSearchInput
            type="text"
            placeholder="Cari di My Shop..."
            value={searchValue}
            onChange={handleSearchChange}
            autoFocus
          />
        </MobileSearchContainer>
      </MobileSearchOverlay>
    </HeaderContainer>
  );
};