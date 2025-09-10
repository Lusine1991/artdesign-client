import React, { useEffect } from "react";
import MessageCard from "../MessageCard/MessageCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userByPk } from "@/entities/user/model/thunks";

export default function MessageList(): React.JSX.Element {
  const user = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(userByPk(user.id));
  }, [dispatch, user]);

  return (
    <div className="container-messagecard">
      <div className="map">
        <MessageCard />
      </div>
    </div>
  );
}
