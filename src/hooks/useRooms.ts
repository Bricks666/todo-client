import { $Rooms, loadRooms, loadRoomsFx, resetRooms } from "@/models/Rooms";
import { useStore } from "effector-react";
import { useEffect } from "react";

export const useRooms = () => {
	const rooms = useStore($Rooms);
	const isLoading = useStore(loadRoomsFx.pending);

	useEffect(() => {
		if (!rooms.length) {
			loadRooms();
		}
	}, [rooms.length]);
	useEffect(() => {
		return () => {
			resetRooms();
		};
	}, []);

	return { rooms, isLoading };
};