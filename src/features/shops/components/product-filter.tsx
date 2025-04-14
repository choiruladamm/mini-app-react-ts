import React from 'react';
import styled from 'styled-components';
import { setCategory, setSortOrder } from '../store/product-slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { Select } from '@/components/global-styled';

const FilterContainer = styled.div`
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 64px;
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
`;

const CategorySection = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SortingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const CategoryButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  white-space: nowrap;
  transition: all 0.2s;

  ${({ isActive }) =>
    isActive
      ? `
      background-color: #3b82f6;
      color: #ffffff;
      &:hover {
        background-color: #2563eb;
      }
    `
      : `
      background-color: #f8fafc;
      color: #64748b;
      border: 1px solid #cbd5e1;
      &:hover {
        background-color: #f1f5f9;
      }
    `}
`;

const SortLabel = styled.span`
  font-size: 0.875rem;
  color: #475569;
  font-weight: 600;
`;

// Available categories
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
        <SortLabel>Sort by:</SortLabel>
        <Select value={sortOrder} onChange={handleSortChange}>
          <option value="none">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </Select>
      </SortingSection>
    </FilterContainer>
  );
};
