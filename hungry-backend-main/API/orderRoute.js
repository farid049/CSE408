const router = require('express').Router();
const order = require('../Model/order');
const accept = require('../Model/accept');
const earned = require('../Model/totalEarn');


// CREATE API TO GENERATE NEW ORDERS 
router.post('/newOrder', async (req, res) =>{
    try {
        const data = req.body;
        const newOrder = new order(data);
        await newOrder.save();
        res.status(200).json({success: true, message: 'Order placed 🥳'})
    } catch (err) {
        console.log(err)
    }
})

// CREATE API TO GET ALL ORDERS
router.get('/fetchOrders', async(req, res) => {
    try {
            const getOrders = await order.find({status: 1});
            if(getOrders.length > 0){
                res.status(200).json({
                    success: true, 
                    orders: getOrders 
                })
            }else{
                res.status(422).json({success: false, message: 'No orders found'})
            }
    } catch (err) {
        console.log(err)
    }
}) 

// CREATE API TO HANDLE ACCEPT ORDER 
router.post('/acceptOrder', async(req, res) => {
    try {
        const {oId, rId} = req.body;
        if(oId && rId){
            const acceptOrder = new accept({orderId: oId, riderId: rId});
            const updateOrder = await order.findByIdAndUpdate(oId, {status: 2})
            if(updateOrder){
                await acceptOrder.save();
                res.status(200).json({success: true, message: 'Order accepted', id: updateOrder._id})
            }else{
                 res.status(422).json({success: false, message: 'There is an error to accept order!'})
            }
        }else{
            res.status(422).json({success: false, message: 'There is an error to accept order!'})
        }
    } catch (err) {
        console.log(err)
    }
})

// CREATE API TO GET ACTIVE ORDER 
router.post('/fetchActiveOrder', async(req, res) => {
    try {
        const {rId} = req.body;
        if(rId){

            const getAllActiveOrdersId = await accept.find({riderId: rId});
            const activeOrders = [];
            for (let i = 0; i < getAllActiveOrdersId.length; i++) {
                const activeOrder = await order.findById(getAllActiveOrdersId[i].orderId);
                activeOrders.push(activeOrder) 
            }

            res.status(200).json({success: true, activeOrders})

        }else{
            res.status(422).json({success: false, message: 'No orders found'})
        }
    } catch (err) {
        console.log(err) 
    }
}) 

// CREATE API TO HANDLE PICKUP FUNCTIONALITY
router.post('/pickupOrder', async(req, res) => {
    try {
        const {id} = req.body;
        if(id){
           const time = new Date().getTime() + 1800000; 
           const updateActiveOrder = await order.findByIdAndUpdate(id, {'status': 3, countdown: time});
            if(updateActiveOrder){
                res.status(200).json({success: true, message: 'Order Picked up 🎖️', time})
            }else{
                 res.status(422).json({success: false, message: 'There is an error to pickup the  order!'})
            }
        }else{
            res.status(422).json({success: false, message: 'There is an error to pickup the order!'})
        }
    } catch (err) {
        console.log(err) 
    }
})

// CREATE API TO HANDLE COMPLETED ORDER FUNCTIONALITY
router.post('/completedOrder', async(req, res) => {
    try {
        const {oId, uId} = req.body;
        if(oId){
            const date = new Date();
            const time = date.getTime();
            const checkPicked = await order.findById(oId);
            if(checkPicked.status == 3){
                const updateActiveOrder = await order.findByIdAndUpdate(oId, {'status': 4, countdown: time})
                 if(updateActiveOrder){
                     const today = {
                        day: date.getDay(),
                        month: date.getMonth() + 1,
                        year: date.getFullYear()
                     }
                     const insertEarn = new earned({riderId: uId, earned: 30, date: today});
                     await insertEarn.save();
                     res.status(200).json({success: true, message: 'Order completed 🎖️'})
                 }else{
                      res.status(422).json({success: false, message: 'There is an error to complete the  order!'})
                }
            }else{
                res.status(422).json({success: false, message: "Order not picked up yet"})
            }
        }else{
            res.status(422).json({success: false, message: 'There is an error to complete the order!'})
        }
    } catch (err) {
        console.log(err) 
    }
})

// CREATE API TO GET SINGLE ORDER (for display on details page)
router.post('/singleOrder', async (req, res) => {
    try {
        const {id} = req.body;
        if(id){
            const getOrder = await order.findById(id);
            if(getOrder){
                res.status(200).json({success: true, order: getOrder})
            }else{
                res.status(404).json({success: false, message: 'No order found'})
            }
            res.status(404).json({success: false, message: 'No order found'})
        }
    } catch (err) {
        console.log(res)
    }
})

router.post('/earnedToday', async (req, res) => {
        try {
            const {rId} = req.body;
            if(rId){
                const getAll = await earned.find({riderId: rId});
                if(getAll){
                    res.status(200).json({success: true, order: getAll})
                }else{
                    res.status(404).json({success: false, message: 'No order completed today'})
                }
                res.status(404).json({success: false, message: 'No order completed today'})
            }
        } catch (err) {
            console.log(res)
        }
})


module.exports = router;