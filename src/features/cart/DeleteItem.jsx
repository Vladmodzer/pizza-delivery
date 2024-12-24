import React from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId, width }) {
  const dispatch = useDispatch();
  return (
    <Button
      width={width}
      onClick={() => dispatch(deleteItem(pizzaId))}
      type="small"
    >
      Delete
    </Button>
  );
}

export default DeleteItem;
