import { useEffect, useState } from 'react';
import RecipeCard from './components/RecipeCard.jsx';

const API_URL = 'https://recipeapi.io/api/v1/recipes';
const API_KEY = import.meta.env.VITE_RECIPE_API;

function formatLabel(value = '') {
  return value
    .replaceAll('_', ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('all');

  useEffect(() => {
    async function loadRecipes() {
      try {
        const response = await fetch(`${API_URL}?per_page=10`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const result = await response.json();
        setRecipes(result.data || []);
      } catch {
        setError('Something went wrong with the API.');
      }
    }

    loadRecipes();
  }, []);

  const cuisines = [];

  for (const recipe of recipes) {
    if (!cuisines.includes(recipe.cuisine)) {
      cuisines.push(recipe.cuisine);
    }
  }

  cuisines.sort();

  const count = recipes.length;
  let totalTime = 0;
  let totalCalories = 0;

  for (const recipe of recipes) {
    totalTime += (recipe.prep_time || 0) + (recipe.cook_time || 0);
    totalCalories += recipe.calories_per_serving || 0;
  }

  const stats = [
    {
      label: 'Total recipes',
      value: count || '—',
    },
    {
      label: 'Avg. total time',
      value: count ? `${Math.round(totalTime / count)} min` : '—',
    },
    {
      label: 'Avg. calories',
      value: count ? `${Math.round(totalCalories / count)} kcal` : '—',
    },
  ];

  const searchTerm = query.trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm);
    const matchesCuisine = cuisine === 'all' || recipe.cuisine === cuisine;

    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="min-h-screen bg-stone-950">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold text-stone-100">
          Recipe Dashboard
        </h1>
        <p className="mt-1 text-sm text-stone-400">
          Search recipes by name, then filter by cuisine.
        </p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-stone-800 bg-stone-900 p-4 shadow-md"
            >
              <dt className="text-xs text-stone-400">{stat.label}</dt>
              <dd className="mt-1 text-xl font-semibold text-stone-100">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="sr-only">Search recipes</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search recipes"
              className="h-10 w-full rounded-md border border-stone-700 bg-stone-900 px-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-stone-500"
            />
          </label>

          <label className="sm:w-48">
            <span className="sr-only">Filter by cuisine</span>
            <select
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value)}
              className="h-10 w-full rounded-md border border-stone-700 bg-stone-900 px-3 text-sm text-stone-100 outline-none focus:border-stone-500"
            >
              <option value="all">All cuisines</option>
              {cuisines.map((option) => (
                <option key={option} value={option}>
                  {formatLabel(option)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-3 text-sm text-stone-400">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>

        <section className="mt-4" aria-label="Recipes">
          {error && <p className="text-sm text-stone-400">{error}</p>}

          {!error && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
