import React, { useState } from 'react';
import { Clothing } from '../App';
import ClothingForm from './ClothingForm';
import ConfirmDialog from './ConfirmDialog';

interface ClothingListProps {
  clothes: Clothing[];
  onEdit: (id: string, updatedClothing: { type: string, color: string, size: string }) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onSort?: (key: keyof Clothing) => void;
  sortConfig?: {key: keyof Clothing, direction: 'asc' | 'desc'} | null;
  types?: string[];
  colors?: string[];
  sizes?: string[];
}

const ClothingList: React.FC<ClothingListProps> = ({ 
  clothes, 
  onEdit,
  onDelete, 
  onSort,
  sortConfig,
  types = [],
  colors = [],
  sizes = []
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [clothingToDelete, setClothingToDelete] = useState<string | null>(null);
  
  const handleSort = (key: keyof Clothing) => {
    if (onSort) {
      onSort(key);
    }
  };
  
  const renderSortIcon = (key: keyof Clothing) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <span className="sort-icon">↕</span>;
    }
    
    return sortConfig.direction === 'asc' 
      ? <span className="sort-icon asc">↑</span> 
      : <span className="sort-icon desc">↓</span>;
  };
  
  const handleEdit = (id: string) => {
    setEditingId(id);
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  
  const handleDeleteClick = (id: string) => {
    setClothingToDelete(id);
    setConfirmDialogOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (clothingToDelete) {
      await onDelete(clothingToDelete);
      setConfirmDialogOpen(false);
      setClothingToDelete(null);
    }
  };
  
  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setClothingToDelete(null);
  };
  
  const handleSubmitEdit = async (clothing: Omit<Clothing, 'id'>) => {
    if (editingId) {
      const success = await onEdit(editingId, clothing);
      if (success) {
        setEditingId(null);
      }
    }
  };
  
  if (clothes.length === 0) {
    return (
      <div className="empty-list">
        <p>Nenhuma roupa encontrada.</p>
      </div>
    );
  }
  
  return (
    <>
      <table className="clothing-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('type')}>
              Tipo {renderSortIcon('type')}
            </th>
            <th onClick={() => handleSort('size')}>
              Tamanho {renderSortIcon('size')}
            </th>
            <th onClick={() => handleSort('color')}>
              Cor {renderSortIcon('color')}
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clothes.map(clothing => (
            <tr key={clothing.id}>
              {editingId === clothing.id ? (
                <td colSpan={4}>
                  <div className="edit-form-container">
                    <ClothingForm 
                      initialValues={clothing}
                      onSubmit={handleSubmitEdit}
                      buttonText="Salvar"
                      types={types}
                      colors={colors}
                      sizes={sizes}
                    />
                    <button 
                      className="cancel-button"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </button>
                  </div>
                </td>
              ) : (
                <>
                  <td>{clothing.type}</td>
                  <td>{clothing.size}</td>
                  <td>{clothing.color}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-button"
                        onClick={() => handleEdit(clothing.id)}
                      >
                        Editar
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteClick(clothing.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      <ConfirmDialog
        isOpen={confirmDialogOpen}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta peça de roupa?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default ClothingList;