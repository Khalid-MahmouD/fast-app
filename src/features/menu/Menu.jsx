import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y-4 divide-stone-200 px-2">
      {
        menu.map(pizza => (
          <MenuItem key={pizza.id} pizza={pizza}
          />
        ))
      }
    </ul>
  );
}

export function Loader() {
  const menu = getMenu();
  return menu;
}
export default Menu;
