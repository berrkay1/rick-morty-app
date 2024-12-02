export const fetchCharacters = async (name: string) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`
    );
    const data = await response.json();
    return data.results || [];
  };