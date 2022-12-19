import { useAppDispatch, useAppSelector } from '../../state/store'
import { addClient, prepareFood, serveFood } from '../../state/gameSlice'
import ClientList from '../clients/clientList'
import FoodComponent from '../food/foodComponent'

const Game = () => {
  // initialize useAppDispatch and useAppSelector
  const clients = useAppSelector((state) => state.game.clients);
  const food = useAppSelector((state) => state.game.food);
  const possibleFood = useAppSelector((state) => state.game.foodTypes);
  const dispatch = useAppDispatch();

  const handleAddClient = () => {
    dispatch(addClient());
  }

  function handlePrepareFodd(typeId: number): void {
    prepareFood(typeId);
  }

  // redux game loop
/*   useEffect(() => {
    let last_time: null | number = null
    const loop = setInterval(() => {
      const time_now = performance.now()
      if (last_time === null) {
        last_time = time_now
      }
      const delta_time = time_now - last_time
      setTotalTime(prevTotalTime => prevTotalTime + delta_time)
      last_time = time_now 

      dispatch(increment(delta_time))
    }, 1000 / 60) // fps

    return () => clearInterval(loop)
   }, []) */

  return (
    <div>
      <h1>Restaurant Yanan</h1>
      <h2>Customers</h2>
      <ClientList data={clients}/>
      <button onClick={() => handleAddClient}>Invite Customer</button>
      <h2>Kitchen</h2>
      {food.map(x => (<FoodComponent data={x} client={false} showCooking={true}/>))}
      <h2>Preparation</h2>
      {possibleFood.map(x => (
        <button onClick={() => handlePrepareFodd(x.typeId)}>
          <FoodComponent data={x} client={false} showCooking={false}/>
        </button>
      ))}
    </div>
  )
}

export default Game