import { Food } from "../../state/types"

interface FoodProps {
    data: Food;
    showCooking: boolean;
    client: boolean;
}

const FoodComponent = ({data, showCooking, client}: FoodProps) => {
    const now = new Date();
    const cookedin = data.ready ? Math.abs((now.getTime() - data.ready.getTime()) / 1000) : 0;
    const overcookedIn = data.overcooked ? Math.abs((now.getTime() - data.overcooked.getTime()) / 1000) : 0;
    return (
        <div>
            <label>{data.name} </label>
            {showCooking && <label>👍:{cookedin} s, 🔥: {overcookedIn} s</label>}
            {client && <label>👍:{cookedin} s, 😡: {overcookedIn} s </label>}
        </div>
    );
};

export default FoodComponent