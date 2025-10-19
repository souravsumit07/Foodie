import React from "react";

const Card = ({ menu }) => {
  return (
    <div className="text-center active:scale-95 ">
      <img src={menu.menu_image} alt={menu.menu_name} className="w-40 h-40 object-cover rounded-full" />
      <h1 className="mt-2 text-lg font-semibold">{menu.menu_name}</h1>
    </div>
  );
};

export default Card;
