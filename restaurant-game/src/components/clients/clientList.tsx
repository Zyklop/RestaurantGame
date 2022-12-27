import { Client } from "../../state/types"
import FoodComponent from "../food/foodComponent";

interface ClientListProps {
    data: Client[];
}

const ClientList = ({data}: ClientListProps) => {
    return (
        <div>
            <h2>Customers</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Food 1</td>
                        <td>Food 2</td>
                        <td>Food 3</td>
                    </tr>
                    {data.map(x => (
                        <tr>
                            <td>x.Name</td>
                            {x.wants.map(y => (
                                <td><FoodComponent data={y} showCooking={false} client={true}/></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientList