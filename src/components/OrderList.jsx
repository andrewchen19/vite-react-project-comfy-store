import { useLoaderData } from "react-router-dom";
import { formatTime } from "../utilize";

// const time = "2023-09-07T09:59:30.427Z";
// console.log(formatTime(time));

const OrderList = () => {
  const { orders, meta } = useLoaderData();
  //   console.log(orders);
  //   console.log(meta);

  return (
    <>
      <h4 className="mt-6 text-base tracking-wider sm:text-lg">
        Total Orders: {meta.pagination.total}
      </h4>
      <div className="mt-6 overflow-x-auto">
        <table className="table table-sm table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                order.attributes;
              return (
                <tr key={order.id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className="hidden sm:block">{formatTime(createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
