const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeCont = document.querySelector(".container");
const recipeDeCnt = document.querySelector(".recipe-detais-content");
const recipeCloseBtn = document.querySelector(".recipe-closeBtn");
const logo = document.querySelector(".logo");

const sagar = document.querySelector(".sagar");

//function to get recipee

const fetchRecipe = async (query) => {
  recipeCont.innerHTML = "Searching Recipes....";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();
    recipeCont.innerHTML = "";

    response.meals.forEach((meals) => {
      const recipeeDiv = document.createElement("div");
      recipeeDiv.classList.add("recipe");
      recipeeDiv.innerHTML = `
      <img src="${meals.strMealThumb}">
      <h3>${meals.strMeal}</h3>
      <p><span>${meals.strArea}</span> Dish</p>
      <p><span>${meals.strCategory}</span> Category</p>
    `;
      const button = document.createElement("button");
      button.textContent = "View recipe";
      recipeeDiv.appendChild(button);

      //adding EventListener to recipee
      button.addEventListener("click", () => {
        openRecipePopUp(meals);
      });

      recipeCont.appendChild(recipeeDiv);
    });
  } catch (error) {
    recipeCont.innerHTML = `<h2>Recipe Not Found!!</h2>`;
  }
};
//fetch indridents

const fetchIngredients = (meals) => {
  console.log(meals);

  let ingedientList = "";
  for (let i = 1; i <= 20; i++) {
    const ingedient = meals[`strIngredient${i}`];
    if (ingedient) {
      const masure = meals[`strMeasure${i}`];
      ingedientList += `<li>${masure} ${ingedient}</li>`;
    } else {
      break;
    }
  }
  return ingedientList;
};
const openRecipePopUp = (meals) => {
  recipeDeCnt.innerHTML = `
    <h2 class="recipeName">${meals.strMeal}</h2> 
    <h3>Indredents: </h3>
    <ul class="ingrigentList">${fetchIngredients(meals)}</ul>
     <div  class="instruction">
     <h3>Instruction:</h3>
     <p>${meals.strInstructions}</p>
    </div>

  `;
  recipeDeCnt.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener("click", () => {
  recipeDeCnt.parentElement.style.display = "none";
});
searchBtn.addEventListener("click", () => {
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeCont.innerHTML = `<h2>Type the meal in the search box</h2>`;
    return;
  }
  fetchRecipe(searchInput);
});

sagar.addEventListener("click", () => {
  const searchInput = searchBox.value.trim();

  fetchRecipe(searchInput);
});

logo.addEventListener("click", () => {
  location.reload();
});
