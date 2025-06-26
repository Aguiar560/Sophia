import React, { useState, useEffect } from 'react';
import './App.css';
import './components/Loading.css';
import './components/scrollable-list.css';
import './components/ConfirmDialog.css';
import ClothingForm from './components/ClothingForm';
import ClothingList from './components/ClothingList';
import FilterBar from './components/FilterBar';
import { fetchClothes, fetchTypes, fetchColors, fetchSizes, addClothing, updateClothing, deleteClothing } from './services/api';

// Definição dos tipos
export interface Clothing {
  id: string;
  type: string;
  size: string;
  color: string;
}

interface TypeData {
  id: number;
  nome: string;
}

interface ColorData {
  id: number;
  nome: string;
}

interface SizeData {
  id: number;
  nome: string;
}

function App() {
  const [clothes, setClothes] = useState<Clothing[]>([]);
  const [filteredClothes, setFilteredClothes] = useState<Clothing[]>([]);
  const [filters, setFilters] = useState({
    type: '',
    color: '',
    size: ''
  });
  const [sortConfig, setSortConfig] = useState<{key: keyof Clothing, direction: 'asc' | 'desc'} | null>(null);
  const [currentView, setCurrentView] = useState<'menu' | 'register' | 'wardrobe'>('menu');
  
  // Estados para os dados do banco
  const [types, setTypes] = useState<TypeData[]>([]);
  const [colors, setColors] = useState<ColorData[]>([]);
  const [sizes, setSizes] = useState<SizeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  // Função para mostrar notificações
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    
    // Remover a notificação após 3 segundos
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Carregar dados do banco de dados
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Carregar tipos, cores e tamanhos
        const typesData = await fetchTypes();
        const colorsData = await fetchColors();
        const sizesData = await fetchSizes();
        
        setTypes(typesData);
        setColors(colorsData);
        setSizes(sizesData);
        
        // Carregar roupas
        const clothesData = await fetchClothes();
        setClothes(clothesData);
        setFilteredClothes(clothesData);
        
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Função para adicionar uma roupa
  const handleAddClothing = async (clothing: { type: string, color: string, size: string, quantity?: number }) => {
    try {
      // Encontrar os IDs correspondentes
      const typeObj = types.find(t => t.nome === clothing.type);
      const colorObj = colors.find(c => c.nome === clothing.color);
      const sizeObj = sizes.find(s => s.nome === clothing.size);
      
      if (!typeObj || !colorObj || !sizeObj) {
        throw new Error('Tipo, cor ou tamanho inválido');
      }
      
      // Obter a quantidade
      const quantity = clothing.quantity || 1;
      
      // Adicionar ao banco de dados (múltiplas vezes baseado na quantidade)
      for (let i = 0; i < quantity; i++) {
        await addClothing(typeObj.id, colorObj.id, sizeObj.id);
      }
      
      // Recarregar as roupas
      const updatedClothes = await fetchClothes();
      setClothes(updatedClothes);
      setFilteredClothes(applyFilters(updatedClothes, filters));
      
      return true;
    } catch (error) {
      console.error('Erro ao adicionar roupa:', error);
      return false;
    }
  };

  // Função para atualizar uma roupa
  const handleUpdateClothing = async (id: string, updatedClothing: { type: string, color: string, size: string }) => {
    try {
      // Encontrar os IDs correspondentes
      const typeObj = types.find(t => t.nome === updatedClothing.type);
      const colorObj = colors.find(c => c.nome === updatedClothing.color);
      const sizeObj = sizes.find(s => s.nome === updatedClothing.size);
      
      if (!typeObj || !colorObj || !sizeObj) {
        throw new Error('Tipo, cor ou tamanho inválido');
      }
      
      // Atualizar no banco de dados
      await updateClothing(id, typeObj.id, colorObj.id, sizeObj.id);
      
      // Recarregar as roupas
      const updatedClothes = await fetchClothes();
      setClothes(updatedClothes);
      setFilteredClothes(applyFilters(updatedClothes, filters));
      
      showNotification('success', 'Roupa atualizada com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar roupa:', error);
      showNotification('error', 'Erro ao atualizar roupa. Tente novamente.');
      return false;
    }
  };

  // Função para excluir uma roupa
  const handleDeleteClothing = async (id: string) => {
    try {
      // Excluir do banco de dados
      await deleteClothing(id);
      
      // Recarregar as roupas
      const updatedClothes = await fetchClothes();
      setClothes(updatedClothes);
      setFilteredClothes(applyFilters(updatedClothes, filters));
      
      showNotification('success', 'Roupa excluída com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir roupa:', error);
      showNotification('error', 'Erro ao excluir roupa. Tente novamente.');
      return false;
    }
  };

  // Função para aplicar filtros
  const applyFilters = (clothesList: Clothing[], filters: { type: string, color: string, size: string }) => {
    return clothesList.filter(clothing => {
      const typeMatch = !filters.type || clothing.type === filters.type;
      const colorMatch = !filters.color || clothing.color === filters.color;
      const sizeMatch = !filters.size || clothing.size === filters.size;
      return typeMatch && colorMatch && sizeMatch;
    });
  };

  // Aplicar filtros quando os filtros mudarem
  useEffect(() => {
    setFilteredClothes(applyFilters(clothes, filters));
  }, [filters, clothes]);

  // Função para ordenar as roupas
  const handleSort = (key: keyof Clothing) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    
    const sortedClothes = [...filteredClothes].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredClothes(sortedClothes);
  };

  // Renderiza o menu principal
  const renderMenu = () => (
    <div className="menu-container">
      <div className="menu-card">
        <h2>Bem-vinda ao Guarda-Roupa da Sophia</h2>
        <p className="welcome-text">
          Este aplicativo ajuda a gerenciar as roupas da Sophia de forma organizada.
          Use o menu acima para navegar entre as diferentes seções.
        </p>
        <div className="menu-options">
          <div className="feature-card">
            <h3>Cadastrar Roupas</h3>
            <p>Adicione novas peças de roupa ao guarda-roupa</p>
            <button 
              className="menu-button register-button"
              onClick={() => setCurrentView('register')}
            >
              Ir para Cadastro
            </button>
          </div>
          <div className="feature-card">
            <h3>Guarda-Roupa</h3>
            <p>Visualize, filtre e gerencie as roupas cadastradas</p>
            <button 
              className="menu-button wardrobe-button"
              onClick={() => setCurrentView('wardrobe')}
            >
              Ver Guarda-Roupa
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderiza a tela de cadastro
  const renderRegister = () => (
    <div className="register-container">
      <div className="view-header">
        <h2>Cadastro de Roupas</h2>
      </div>
      
      <ClothingForm 
        onSubmit={async (clothing) => {
          const success = await handleAddClothing(clothing);
          if (success) {
            showNotification('success', `${clothing.quantity > 1 ? clothing.quantity + ' peças' : 'Peça'} cadastrada${clothing.quantity > 1 ? 's' : ''} com sucesso!`);
          } else {
            showNotification('error', 'Erro ao cadastrar roupa. Tente novamente.');
          }
        }}
        types={types.map(t => t.nome)}
        colors={colors.map(c => c.nome)}
        sizes={sizes.map(s => s.nome)}
      />
    </div>
  );

  // Renderiza a tela do guarda-roupa
  const renderWardrobe = () => (
    <>
      <div className="view-header">
        <h2>Guarda-Roupa da Sophia</h2>
      </div>
      
      <div className="wardrobe-container">
        <div className="wardrobe-sidebar">
          <div className="results-header">
            <div className="results-count">
              {filteredClothes.length} {filteredClothes.length === 1 ? 'item' : 'itens'} encontrados
            </div>
          </div>
          
          <div className="filter-bar">
            <FilterBar
              types={types.map(t => t.nome)}
              colors={colors.map(c => c.nome)}
              sizes={sizes.map(s => s.nome)}
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
        </div>
        
        <div className="clothing-list-container">
            <ClothingList 
              clothes={filteredClothes}
              onEdit={handleUpdateClothing}
              onDelete={handleDeleteClothing}
              onSort={handleSort}
              sortConfig={sortConfig}
              types={types.map(t => t.nome)}
              colors={colors.map(c => c.nome)}
              sizes={sizes.map(s => s.nome)}
            />
        </div>
      </div>
    </>
  );

  // Renderiza o conteúdo com base na visualização atual
  const renderContent = () => {
    if (loading) {
      return <div className="loading-container"><div className="loading"></div></div>;
    }
    
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    
    switch (currentView) {
      case 'register':
        return renderRegister();
      case 'wardrobe':
        return renderWardrobe();
      default:
        return renderMenu();
    }
  };

  return (
    <div className="app">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            {notification.type === 'success' && <span className="notification-icon">✓</span>}
            {notification.type === 'error' && <span className="notification-icon">✕</span>}
            <span>{notification.message}</span>
          </div>
        </div>
      )}
      <header className="app-header">
        <h1>Guarda-Roupa da Sophia</h1>
        <nav className="main-nav">
          <button 
            className={`nav-button ${currentView === 'menu' ? 'active' : ''}`}
            onClick={() => setCurrentView('menu')}
          >
            Menu Principal
          </button>
          <button 
            className={`nav-button ${currentView === 'register' ? 'active' : ''}`}
            onClick={() => setCurrentView('register')}
          >
            Cadastrar Roupas
          </button>
          <button 
            className={`nav-button ${currentView === 'wardrobe' ? 'active' : ''}`}
            onClick={() => setCurrentView('wardrobe')}
          >
            Guarda-Roupa
          </button>
        </nav>
      </header>
      
      <main className="app-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;