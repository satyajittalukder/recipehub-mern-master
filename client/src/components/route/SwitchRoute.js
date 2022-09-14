import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BrowseRecipe from "../pages/BrowseRecipePage";
import FavouritePage from "../pages/FavouritePage";
import LoginPage from "../pages/LoginPage";
// import LogoutPage from "../pages/LogoutPage";
import SignupPage from "../pages/SignupPage";
import RecipePage from "../pages/RecipePage";
import NewRecipePage from "../pages/NewRecipePage";
import SearchPage from "../pages/SearchPage";
import RandomRecipePage from "../pages/RandomRecipePage";
import PlannerPage from "../pages/PlannerPage";
import MyPostedRecipes from "../pages/MyPostedRecipes";
import EditRecipePage from "../pages/EditRecipePage";
import GenerateShoppingList from "../pages/GenerateShoppingList";
import About from "../pages/About";
// import AxiosTest from "../pages/axiostest";

const SwitchRoute = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/browse">
        <BrowseRecipe />
      </Route>
      <Route exact path="/search">
        <SearchPage />
      </Route>
      {/* <Route exact path="/search/:category">
        <SearchPage />
      </Route>
      <Route exact path='/search/:category/:keyword'>
        <SearchPage />
      </Route>
      <Route exact path='/search/:category/:keyword/:filter'>
        <SearchPage />
      </Route> */}
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/random">
        <RandomRecipePage />
      </Route>

      <Route exact path="/planner">
        <PlannerPage />
      </Route>
      <Route exact path="/planner/generate">
        <GenerateShoppingList />
      </Route>
      <Route exact path="/recipe/new">
        <NewRecipePage />
      </Route>
      <Route exact path="/recipe/user">
        <MyPostedRecipes />
      </Route>
      <Route exact path="/recipe/:recipeID">
        <RecipePage />
      </Route>
      <Route exact path="/recipe/:recipeID/edit">
        <EditRecipePage />
      </Route>
      <Route exact path="/fave">
        <FavouritePage />
      </Route>
      <Route exact path="/login/">
        <LoginPage />
      </Route>
      <Route exact path="/signup">
        <SignupPage />
      </Route>
      {/* <Route path='/axios'>
        <AxiosTest />
      </Route> */}
    </Switch>
  );
};

export default SwitchRoute;
