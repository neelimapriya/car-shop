import { Request, Response } from "express";
import Order from "./order.model";
import { orderService, getTotalPriceFromDB } from "./order.service";
import { IOrder } from "./order.interface";

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await orderService.createCustomerOrder(payload);

    res.status(200).json({
      success: true,
      message: "order created successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      message: "Something went wrong",
      error: err,
    });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getOrderService();
    res.status(200).json({
      success: true,
      message: "Order Getting successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      message: "Something went wrong",
      error: err,
    });
  }
};

// const getTotalPrice=async(req:Request, res:Response)=>{
//     const {carId}=req.params
//     const id=parseInt(carId)

//     try{
//         const result =await orderService.getTotalPriceFromDB(id)
//         if(result !== null){
//             let totalPrice=0;
//             const totalArray:number[]=result[0].order?.map(
//                 (i:IOrder)=>i?.totalPrice * i?.quantity
//             )
//             totalArray.forEach((i)=>(totalPrice +=i))

//             return res.status(200).json({
//                 success: true,
//                 message: 'Total price calculated successfully!',
//                 data: { totalPrice },
//               });
//         }else{
//             return res.status(400).json({
//                 success: false,
//                 message: 'Orders not found',
//                 error: {
//                   code: 404,
//                   description: 'Orders not found!',
//                 },
//               });
//         }
//     }catch (err) {
//         res.status(400).json({
//           success: false,
//           message: 'Orders not found',
//           error: {
//             code: 404,
//             description: 'Orders not found!',
//           },
//         });
//       }
// }

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const totalPrice = await getTotalPriceFromDB();
    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: { totalPrice },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Total revenue not found",
      error,
    });
  }
};

export const orderController = {
  createOrder,
  getOrder,
  getTotalPrice,
};
