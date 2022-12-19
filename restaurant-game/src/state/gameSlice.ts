import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientRequest } from "http";
import { Food, Client } from "./types";

interface GameState {
    clients: Client[],
    food: Food[],
    foodTypes: Food[]
}

const initialState : GameState = {
    clients: [],
    food: [],
    foodTypes: []
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        addClient: state => {
            const nrFood = Math.ceil(Math.random() * 3);
            let wantedFood : Food[] = [];
            for (let index = 0; index < nrFood; index++) {
                const foodIndex = Math.floor(Math.random() * state.foodTypes.length)
                const element = wantedFood.push(state.foodTypes[foodIndex]);
            }
            let newClient : Client = new Client("test", wantedFood);
            state.clients.push(newClient);
        },

        prepareFood: (state, action: PayloadAction<number>) => {
            let newFood : Food = state.foodTypes[action.payload].createNew();
            state.food.push(newFood);
        },

        serveFood: (state, action: PayloadAction<number>) => {
            const time = new Date();
            let foodIndex = state.food.findIndex(x => x.id == action.payload);
            if (foodIndex === -1) return;
            let food = state.food[foodIndex];
            if (food.ready < time || food.spoiled > time) return;
            let clientIndex = state.clients.findIndex(x => x.wants.findIndex(y => y.typeId == food.typeId) != -1)
            if (clientIndex == -1) return;
            let client = state.clients[clientIndex];
            state.food.splice(foodIndex);
            client.wants.splice(client.wants.findIndex(y => y.typeId == food.typeId));
            if(client.wants.length == 0) {
                state.clients.splice(clientIndex)
            }
        }
    }
})

// export reducer
export default gameSlice.reducer

export const {
    addClient,
    prepareFood,
    serveFood
} = gameSlice.actions