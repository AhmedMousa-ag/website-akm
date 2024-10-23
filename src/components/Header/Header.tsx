import { NavBar } from "./NavBar";
import { NavElementRight } from "./NavElements";
import { Button } from "./Atoms/Button";
export const Header = () => {
  return (
    <NavBar className="flex bg-black text-white justify-between h-20 font-poppins">
      <div className="mt-6 ml-6">
        <p>Ahmed Karem Mousa</p>
      </div>
      <NavElementRight>
        <Button className="mt-6">Personal Projects</Button>
        <Button>History</Button>
        <Button>Github</Button>
      </NavElementRight>
    </NavBar>
  );
};
