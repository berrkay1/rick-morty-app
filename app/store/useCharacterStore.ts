import { create } from 'zustand';

export type Character = {
  id: number;
  name: string;
  image: string;
  episode: string[];
  status: string;
  species: string;
}

type CharacterState = {
  selectedCharacters: Character[];
  searchQuery: string;
  toggleCharacter: (item: Character) => void;
  setSearchQuery: (query: string) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  selectedCharacters: [],
  searchQuery: '',
  toggleCharacter: (item: Character) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.some(char => char.id === item.id)
        ? state.selectedCharacters.filter((char) => char.id !== item.id)
        : [...state.selectedCharacters, item],
    })),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
