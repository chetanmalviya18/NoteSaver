import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 justify-evenly items-center bg-amber-100 mx-44 mt-4 p-2 rounded-3xl text-amber-700 font-bold ">
      <NavLink to={"/"} className="hover:bg-amber-300 rounded-3xl px-3 py-1">
        Home
      </NavLink>
      <NavLink
        to={"/pastes"}
        className="hover:bg-amber-300 rounded-3xl px-3 py-1"
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
