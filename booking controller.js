const prisma = require("../config/prisma");
const { getIO } = require("../sockets/socket");

exports.joinQueue = async (req,res)=>{

    const { queueId } = req.body;

    const booking = await prisma.booking.create({
        data:{
            userId:req.user.id,
            queueId,
            status:"WAITING"
        }
    });

    await prisma.queue.update({
        where:{ id:queueId },
        data:{
            currentLength:{
                increment:1
            }
        }
    });

    const queue = await prisma.queue.findUnique({
        where:{ id:queueId }
    });

    getIO().to(queue.businessId).emit(
        "queueUpdated",
        queue
    );

    res.json(booking);
};

//staus update
exports.updateBookingStatus = async (req,res)=>{

    const { id } = req.params;
    const { status } = req.body;

    const booking =
        await prisma.booking.update({

        where:{ id },

        data:{ status }

    });

    const queue =
        await prisma.queue.findUnique({
            where:{ id:booking.queueId }
        });

    getIO()
        .to(queue.businessId)
        .emit("bookingStatusChanged",{

            bookingId:id,
            status

        });

    res.json(booking);
};


//booking routes 
const express = require("express");
const router = express.Router();

const controller =
require("../controllers/bookingController");

router.post(
"/join",
controller.joinQueue
);

router.patch(
"/:id/status",
controller.updateBookingStatus
);

module.exports = router;

//queue api
router.get(
"/:businessId",
async(req,res)=>{

 const queue =
 await prisma.queue.findFirst({

  where:{
   businessId:req.params.businessId
  },

  include:{
   bookings:true
  }

 });

 res.json(queue);
});

// socket service
import { io } from "socket.io-client";

export const socket = io(
 "http://YOUR_SERVER:5000"
);

// notification service
if(
 estimatedWaitTime <= userTravelTime
){

 sendPushNotification(
  userId,
  "Time to leave!"
 );
}       

//milestone alert
if(position === 2){

 sendPushNotification(
   userId,
   "You are next up!"
 );

}
// delay alert
if(delayAdded){

 sendPushNotification(
  userId,
  "Provider has reported a delay."
 );

}
