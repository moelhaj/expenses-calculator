"use client";
import { store, persister } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persister}>{children}</PersistGate>
		</Provider>
	);
}
