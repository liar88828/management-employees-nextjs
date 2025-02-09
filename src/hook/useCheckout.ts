import { useState } from "react";
import { TTrolleyProductUser } from "@/interface/entity/trolley.model";

export const useCheckout = (data: TTrolleyProductUser[] | undefined) => {
	const [ newData, setNewData ] = useState(data);

	const onIncrement = (idTrolley: string) => {
		setNewData((prev) =>
			prev?.map((item) =>
				item.id === idTrolley
					? { ...item, qty_at_buy: item.qty_at_buy + 1 }
					: item
			)
		);
	};

	const onDecrement = (idTrolley: string) => {
		setNewData((prev) =>
			prev?.map((item) =>
				item.id === idTrolley && item.qty_at_buy > 1
					? { ...item, qty_at_buy: item.qty_at_buy - 1 }
					: item
			)
		);
	};

	const onRemove = (idTrolley: string) => {
		setNewData((prev) =>
			prev?.filter((item) => item.id !== idTrolley)
		);
	};

	return {
		onIncrement,
		onDecrement,
		onRemove,
		onData: newData,
	};
};