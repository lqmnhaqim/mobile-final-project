// API service — integration with a public REST API (PokeAPI)
// Used by the Home screen to fetch items and the Detail screen to show item info.
const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchItems(limit = 20) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch items');
  const data = await res.json();
  return data.results.map((r, i) => ({
    id: i + 1,
    name: r.name,
    url: r.url,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`,
  }));
}

export async function fetchItemDetail(id) {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) throw new Error('Failed to fetch detail');
  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    image: data.sprites?.other?.['official-artwork']?.front_default,
    height: data.height,
    weight: data.weight,
    types: data.types.map((t) => t.type.name),
    abilities: data.abilities.map((a) => a.ability.name),
  };
}
