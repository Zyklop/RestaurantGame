import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food, Client, FoodState } from "./types";

interface GameState {
    clients: Client[],
    food: Food[],
    foodTypes: Food[]
}

const tea : Food = { 
    name: "🍵", 
    id: 0, 
    createNew: ():Food => {
        const ready = new Date();
        ready.setSeconds(ready.getSeconds() + 10);
        const spoiled = new Date();
        spoiled.setSeconds(spoiled.getSeconds() + 90);
        return { 
            name: "🍵", 
            id: Math.ceil(Math.random() * 100000), 
            state: FoodState.cooking, 
            createNew: () => undefined,
            typeId: 1,
            ready: ready,
            spoiled: spoiled
        }
    },
    typeId: 0,
    state: FoodState.unknown
};


const initialState : GameState = {
    clients: [],
    food: [],
    foodTypes: [ tea ]
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
                wantedFood.push(state.foodTypes[foodIndex]);
            }
            let newClient : Client = new Client("test", wantedFood);
            state.clients.push(newClient);
        },

        prepareFood: (state, action: PayloadAction<number>) => {
            let newFood = state.foodTypes[action.payload].createNew();
            if (newFood !== undefined) {
                state.food.push(<Food>newFood);
            }
        },

        serveFood: (state, action: PayloadAction<number>) => {
            const time = new Date();
            let foodIndex = state.food.findIndex(x => x.id === action.payload);
            if (foodIndex === -1) return;
            let food = state.food[foodIndex];
            if (!food.ready || food.ready < time || (food.spoiled && food.spoiled > time)) return;
            let clientIndex = state.clients.findIndex(x => x.wants.findIndex(y => y.typeId === food.typeId) !== -1)
            if (clientIndex === -1) return;
            let client = state.clients[clientIndex];
            state.food.splice(foodIndex);
            client.wants.splice(client.wants.findIndex(y => y.typeId === food.typeId));
            if(client.wants.length === 0) {
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