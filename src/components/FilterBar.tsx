import React from 'react';

interface FilterBarProps {
  types: string[];
  colors: string[];
  sizes: string[];
  filters: {
    type: string;
    color: string;
    size: string;
  };
  onFilterChange: (filters: {
    type: string;
    color: string;
    size: string;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  types, 
  colors, 
  sizes, 
  filters, 
  onFilterChange 
}) => {
  const handleFilterChange = (name: string, value: string) => {
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="filter-options">
      <div className="filter-group">
        <label>Tipo:</label>
        <select 
          value={filters.type} 
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="">Todos</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Cor:</label>
        <select 
          value={filters.color} 
          onChange={(e) => handleFilterChange('color', e.target.value)}
        >
          <option value="">Todas</option>
          {colors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Tamanho:</label>
        <select 
          value={filters.size} 
          onChange={(e) => handleFilterChange('size', e.target.value)}
        >
          <option value="">Todos</option>
          {sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      
      <button 
        className="clear-filters"
        onClick={() => onFilterChange({ type: '', color: '', size: '' })}
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export default FilterBar;