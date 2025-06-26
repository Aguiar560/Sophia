const API_URL = 'http://localhost:5000/api';

export interface ClothingData {
  id: string;
  type: string;
  color: string;
  size: string;
}

export interface TypeData {
  id: number;
  nome: string;
}

export interface ColorData {
  id: number;
  nome: string;
}

export interface SizeData {
  id: number;
  nome: string;
}

// Função para buscar todas as roupas
export const fetchClothes = async (): Promise<ClothingData[]> => {
  try {
    const response = await fetch(`${API_URL}/clothes`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar roupas:', error);
    throw error;
  }
};

// Função para buscar todos os tipos
export const fetchTypes = async (): Promise<TypeData[]> => {
  try {
    const response = await fetch(`${API_URL}/types`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar tipos:', error);
    throw error;
  }
};

// Função para buscar todas as cores
export const fetchColors = async (): Promise<ColorData[]> => {
  try {
    const response = await fetch(`${API_URL}/colors`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar cores:', error);
    throw error;
  }
};

// Função para buscar todos os tamanhos
export const fetchSizes = async (): Promise<SizeData[]> => {
  try {
    const response = await fetch(`${API_URL}/sizes`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar tamanhos:', error);
    throw error;
  }
};

// Função para adicionar uma roupa
export const addClothing = async (typeId: number, colorId: number, sizeId: number): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/clothes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ typeId, colorId, sizeId })
    });
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Erro ao adicionar roupa:', error);
    throw error;
  }
};

// Função para atualizar uma roupa
export const updateClothing = async (id: string, typeId: number, colorId: number, sizeId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/clothes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ typeId, colorId, sizeId })
    });
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error('Erro ao atualizar roupa:', error);
    throw error;
  }
};

// Função para excluir uma roupa
export const deleteClothing = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/clothes/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error('Erro ao excluir roupa:', error);
    throw error;
  }
};