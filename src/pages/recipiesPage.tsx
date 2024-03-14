import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import Header from '../components/headerComponent';
import { LoginProps } from '../interfaces/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import Login from './loginPage';
import Loading from '../components/loadingComonent';

const RecipesPage: React.FC<LoginProps> = ({ firebase }) => {
  interface RecipeData {
    recipeName: string;
    priority: number;
    foodType: string;
    id: string;
  }
  if (!firebase) {
    return <div>Error: Firebase not available</div>;
  }
  const auth = getAuth(firebase);
  const firestore = getFirestore(firebase);
  const [user, loading] = useAuthState(auth);

  const [recipeName, setRecipeName] = useState('');
  const [priority, setPriority] = useState<number>(1);
  const [foodType, setFoodType] = useState('food');
  const [recipes, setRecipes] = useState<RecipeData[]>([]); // State to hold recipes data
  const [foodRecipes, setFoodRecipes] = useState<RecipeData[]>([]); // State to hold food recipes data
  const [dessertRecipes, setDessertRecipes] = useState<RecipeData[]>([]); // State to hold dessert recipes data

  // Function to fetch recipes from Firestore
  const fetchRecipes = async () => {
    const recipesCollection = collection(firestore, 'recipes');
    const snapshot = await getDocs(recipesCollection);
    const recipesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const recipiesAsType = recipesData as RecipeData[];
    setRecipes(recipiesAsType);
    console.log(recipes);

    // categorize recipes based on foodType
    const foodRecipesData = recipiesAsType.filter(
      (recipe) => recipe.foodType === 'food'
    );
    setFoodRecipes(foodRecipesData);

    const dessertRecipesData = recipiesAsType.filter(
      (recipe) => recipe.foodType === 'dessert'
    );
    setDessertRecipes(dessertRecipesData);
  };

  useEffect(() => {
    fetchRecipes(); // Fetch recipes when component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, 'recipes'), {
        recipeName,
        priority,
        foodType,
      });
      console.log('Recipe added with ID: ', docRef.id);
      // Reset form fields after successful submission
      setRecipeName('');
      setPriority(1);
      setFoodType('food');
      // Fetch recipes again to update the list
      fetchRecipes();
    } catch (error) {
      console.error('Error adding recipe: ', error);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    if (!user) {
      return <Login firebase={firebase} />;
    }
  }

  return (
    <div className='max-w-xl mx-auto container-bucket'>
      <Header user={user} isGiftDisabled={false} />
      <div>
        <h2 className='my-4 text-3xl font-bold text-center'>
          Meepi & Peepi reseptit {'<3'}
        </h2>
        <h3 className='my-3 text-2xl font-bold'>Ruoka reseptit</h3>
        <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-4'>
          <div className='mb-4'>
            <label htmlFor='recipeName' className='block text-gray-700'>
              Reseptin nimi:
            </label>
            <input
              id='recipeName'
              type='text'
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className='block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='priority' className='block text-gray-700'>
              Kalleus astetta 1-3 (1 halvin, 3 kallein):
            </label>
            <input
              id='priority'
              type='number'
              max={3}
              min={1}
              defaultValue={1}
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value))}
              className='block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='foodType' className='block text-gray-700'>
              Ruokatyyppi:
            </label>
            <select
              id='foodType'
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className='block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
            >
              <option value='food'>Ruoka</option>
              <option value='dessert'>Jälkiruoka</option>
            </select>
          </div>
          <div>
            <button
              type='submit'
              className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
      <div>
        <div>
          <h3 className='py-4 mt-10 text-2xl font-bold'>Ruokareseptit</h3>
          <ul className='flex gap-2'>
            {foodRecipes.map((recipe) => (
              <li
                className='p-4 border-2 rounded-md bg-light border-primary'
                key={recipe.id}
              >
                <div className='mb-2 text-2xl font-bold'>
                  {recipe.recipeName}
                </div>
                <div className='flex flex-row items-center gap-2'>
                  <p>Hinta:</p>
                  <div
                    className={`h-4 w-4 rounded-full ${
                      recipe.priority == 1 && 'bg-green-400'
                    } ${recipe.priority == 2 && 'bg-yellow-400'} ${
                      recipe.priority == 3 && 'bg-red-400'
                    }`}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <h3 className='py-4 mt-10 text-2xl font-bold'>Jälkiruoat</h3>
        <ul className='flex gap-2'>
          {dessertRecipes.map((recipe) => (
            <li
              className='p-4 border-2 rounded-md bg-light border-primary'
              key={recipe.id}
            >
              <div className='text-xl font-bold'>{recipe.recipeName}</div>
              <div className='flex flex-row items-center gap-2'>
                <p>Hinta:</p>
                <div
                  className={`h-4 w-4 rounded-full ${
                    recipe.priority == 1 && 'bg-green-400'
                  } ${recipe.priority == 2 && 'bg-yellow-400'} ${
                    recipe.priority == 3 && 'bg-red-400'
                  }`}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipesPage;
