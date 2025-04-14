import {
  Container,
  Grid,
  PageContainer,
  theme,
} from '@/components/global-styled';
import { useAppSelector } from '@/hooks/use-app-selector';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ProductCard } from '../components';

const ProductsHeader = styled.div`
  margin-bottom: 24px;
`;

const ProductsTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ProductsCount = styled.p`
  color: ${theme.colors.gray[600]};
`;

const NoResults = styled.div`
  padding: 32px;
  text-align: center;
  color: ${theme.colors.gray[600]};
`;

const ProductListPage: React.FC = () => {
  const { filteredProducts, searchQuery, selectedCategory } = useAppSelector(
    (state) => state.products
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (selectedCategory !== 'all') {
      return (
        selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
      );
    }
    return 'All Products';
  };

  return (
    <>
      {/* <ProductFilter /> */}
      <PageContainer>
        <Container>
          <ProductsHeader>
            <ProductsTitle>{getPageTitle()}</ProductsTitle>
            <ProductsCount>
              {filteredProducts.length} products found
            </ProductsCount>
          </ProductsHeader>

          {filteredProducts.length === 0 ? (
            <NoResults>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query.</p>
            </NoResults>
          ) : (
            <Grid>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
          )}
        </Container>
      </PageContainer>
    </>
  );
};

export default ProductListPage;
