function formatLabel(value = '') {
  return value
    .replaceAll('_', ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function RecipeCard({ recipe }) {
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <article className="flex h-full flex-col rounded-lg border border-stone-800 bg-stone-900 p-5 shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold leading-snug text-stone-100">{recipe.name}</h2>
        <span className="shrink-0 rounded border border-stone-700 px-1.5 py-0.5 text-[11px] capitalize text-stone-300">
          {recipe.difficulty}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-5 text-stone-400">
        {recipe.description}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-stone-800 pt-4 text-sm">
        <div>
          <dt className="text-xs text-stone-500">Cuisine</dt>
          <dd className="mt-0.5 text-stone-200">{formatLabel(recipe.cuisine)}</dd>
        </div>
        <div>
          <dt className="text-xs text-stone-500">Meal</dt>
          <dd className="mt-0.5 text-stone-200">{formatLabel(recipe.meal_type)}</dd>
        </div>
        <div>
          <dt className="text-xs text-stone-500">Total time</dt>
          <dd className="mt-0.5 text-stone-200">{totalTime} min</dd>
        </div>
        <div>
          <dt className="text-xs text-stone-500">Calories</dt>
          <dd className="mt-0.5 text-stone-200">{recipe.calories_per_serving} kcal</dd>
        </div>
      </dl>
    </article>
  );
}
