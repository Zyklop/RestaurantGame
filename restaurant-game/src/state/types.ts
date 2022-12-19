export interface Food {
    readonly name: string;
    readonly id: number;
    typeId: number;
    readonly prepareTime: number;
    readonly spoilTime: number;
    readonly ready: Date;
    readonly overcooked?: Date;
    readonly spoiled: Date;
    state: FoodState;

    createNew(): Food;
}

export type FoodState = "cooking" | "ready" | "unusable"

export class Client {
    name: string;
    wants: Food[];
    
    constructor(name: string, wants: Food[]) {
        this.name = name;
        this.wants = wants;
    }
}