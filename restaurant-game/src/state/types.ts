export interface Food {
    readonly name: string;
    readonly id: number;
    typeId: number;
    readonly ready?: Date;
    readonly overcooked?: Date;
    readonly spoiled?: Date;
    state: FoodState;

    createNew(): Food | undefined;
}

export enum FoodState {
    cooking = 1,
    ready, 
    unusable,
    unknown
}

export class Client {
    name: string;
    wants: Food[];
    
    constructor(name: string, wants: Food[]) {
        this.name = name;
        this.wants = wants;
    }
}