import { BsMailbox2, BsFillPinMapFill } from "react-icons/bs";
import type { CardUserProps } from "../libs/CardUserType";

interface UserCardDetailProps {
  email: CardUserProps["email"];
  address: CardUserProps["address"];
}

export const UserCardDetail = ({ email, address }: UserCardDetailProps) => {
  return (
    <div className="text-center">
      <p>
        <BsMailbox2 /> {email}
      </p>
      <p>
        <BsFillPinMapFill /> {address}
      </p>
    </div>
  );
};
