import React, { useState } from 'react';
import { Clothing } from '../App';
import './quantity.css';

interface ClothingFormProps {
  onSubmit: (clothing: Omit<Clothing, 'id'> & { quantity: number }) => void;
  initialValues?: Omit<Clothing, 'id'>;
  buttonText?: string;
  types?: string[];
  colors?: string[];
  sizes?: string[];
}

const ClothingForm: React.FC<ClothingFormProps> = ({ 
  onSubmit, 
  initialValues = { type: '', size: '', color: '' },
  buttonText = 'Adicionar',
  types = [],
  colors = [],
  sizes = []
}) => {
  const [formData, setFormData] = useState({
    ...initialValues,
    quantity: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Limpar o formulário se for um novo item
    if (buttonText === 'Adicionar') {
      setFormData({ type: '', size: '', color: '', quantity: 1 });
    }
  };

  return (
    <div className="form-container">
      <h2>{buttonText === 'Adicionar' ? 'Adicionar Nova Roupa' : 'Editar Roupa'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">TIPO:</label>
          <select 
            id="type" 
            name="type" 
            value={formData.type} 
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="size">TAMANHO:</label>
          <select 
            id="size" 
            name="size" 
            value={formData.size} 
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="color">COR:</label>
          <select 
            id="color" 
            name="color" 
            value={formData.color} 
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">QUANTIDADE:</label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            value={formData.quantity} 
            onChange={handleChange}
            min="1"
            max="100"
            required
          />
        </div>
        
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
};

export default ClothingForm;