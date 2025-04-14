import React from 'react';
import styled from 'styled-components';
import { setCategory, setSortOrder } from '../store/product-slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { Select, theme } from '@/components/global-styled';

const FilterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  /* background-color: ${theme.colors.white}; */
  border-bottom: 1px solid ${theme.colors.gray[200]};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
  }
`;

const CategorySection = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.gray[300]};
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SortingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CategoryButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${({ isActive }) =>
    isActive ? theme.colors.primary[600] : theme.colors.white};
  color: ${({ isActive }) =>
    isActive ? theme.colors.white : theme.colors.gray[700]};

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? theme.colors.primary[600] : theme.colors.gray[100]};
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 6px 12px;
  }
`;

const SortLabel = styled.span`
  font-size: 14px;
  color: ${theme.colors.gray[700]};
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.white};
  font-size: 14px;
  color: ${theme.colors.gray[700]};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 6px 10px;
    width: 100%;
  }
`;

const categories = ['all', 'beauty', 'fragrances', 'furniture'];

export const ProductFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCategory, sortOrder } = useAppSelector(
    (state) => state.products
  );

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setSortOrder(e.target.value as 'none' | 'price-asc' | 'price-desc')
    );
  };

  const formatCategoryName = (category: string) => {
    if (category === 'all') return 'All Products';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <FilterContainer>
      <CategorySection>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            isActive={category === selectedCategory}
            onClick={() => handleCategoryChange(category)}
          >
            {formatCategoryName(category)}
          </CategoryButton>
        ))}
      </CategorySection>

      <SortingSection>
        <SortLabel style={{whiteSpace: 'nowrap'}}>Sort by:</SortLabel>
        <Select value={sortOrder} onChange={handleSortChange}>
          <option value="none">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </Select>
      </SortingSection>
    </FilterContainer>
  );
};