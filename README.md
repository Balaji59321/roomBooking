# RoomBooking API

# Task Write Api for HallBooking Application

Create Room:      
POST - https://roombooking-node.herokuapp.com/room/create    

Payload:    
{
	"id" : 1,
	"name" : "godavari",
	"roomNumber" : 1,
	"seats" : 100,
    "price" : 250,
    "amenties" : ["Table","Chair"],
    "booked": {}
}

Response:    
{
    "acknowledged": true,
    "insertedId": "627d2dcdfd82aac819f20993"
}

<img width="1062" alt="Screen Shot 2022-05-12 at 10 25 18 PM" src="https://user-images.githubusercontent.com/26063120/168128615-0dee4265-43ba-47bf-bf6c-5f95b88b9192.png">

Update Room:    
PUT - https://roombooking-node.herokuapp.com/room/update/627d2dcdfd82aac819f20993      

Payload:     
{
    "booked": {}
}

Response:
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}

<img width="1002" alt="Screen Shot 2022-05-12 at 10 25 27 PM" src="https://user-images.githubusercontent.com/26063120/168128657-09d2b7a0-914a-421c-b628-d04eadbeb6cf.png">

Get all rooms:    
GET - https://roombooking-node.herokuapp.com/room/get    

Response:    
[
    {
        "_id": "627d2dcdfd82aac819f20993",
        "id": 1,
        "name": "godavari",
        "roomNumber": 1,
        "seats": 100,
        "price": 250,
        "amenties": [
            "Table",
            "Chair"
        ],
        "booked": {
            "14/05/2022": [
                [
                    "13:00:00",
                    "14:00:00"
                ],
                [
                    "14:00:00",
                    "15:00:00"
                ]
            ],
            "15/05/2022": [
                [
                    "14:00:00",
                    "15:00:00"
                ]
            ]
        }
    }
]

<img width="1077" alt="Screen Shot 2022-05-12 at 10 25 34 PM" src="https://user-images.githubusercontent.com/26063120/168128693-0f4bdfcd-b0d5-475b-8495-ce7a93a85a63.png">

Delete a Room:   
DELETE - https://roombooking-node.herokuapp.com/room/remove/627d2c4dfd82aac819f20992    

Response:    
{
    "acknowledged": true,
    "deletedCount": 1
}

<img width="1108" alt="Screen Shot 2022-05-12 at 10 25 39 PM" src="https://user-images.githubusercontent.com/26063120/168128788-729cb858-460a-4e14-baeb-520dea7be3a0.png">


Get all customer details       
GET - https://roombooking-node.herokuapp.com/book/getRoom   

Response:   
[
    {
        "_id": "627d2e7afd82aac819f20994",
        "booked": {
            "14/05/2022": [
                [
                    "13:00:00",
                    "14:00:00"
                ]
            ]
        },
        "name": "Customer 1",
        "customerId": 1,
        "date": "14/05/2022",
        "roomId": 1,
        "startTime": "13:00:00",
        "endTime": "14:00:00"
    },
    {
        "_id": "627d2e9afd82aac819f20995",
        "booked": {
            "14/05/2022": [
                "14:00:00",
                "15:00:00"
            ]
        },
        "name": "Customer 1",
        "customerId": 1,
        "date": "14/05/2022",
        "roomId": 1,
        "startTime": "14:00:00",
        "endTime": "15:00:00"
    },
    {
        "_id": "627d2eadfd82aac819f20996",
        "booked": {
            "15/05/2022": [
                "14:00:00",
                "15:00:00"
            ]
        },
        "name": "Customer 1",
        "customerId": 1,
        "date": "15/05/2022",
        "roomId": 1,
        "startTime": "14:00:00",
        "endTime": "15:00:00"
    }
]

<img width="1132" alt="Screen Shot 2022-05-12 at 10 27 23 PM" src="https://user-images.githubusercontent.com/26063120/168128891-a7db8d89-c8f8-4eca-8ec0-ec10a8dedf92.png">

Cancel the customer subscription:    
DELETE - https://roombooking-node.herokuapp.com/book/delete/1   

Payload:   
{
    "date": "14/05/2022",
    "startTime" : "13:00:00",
    "endTime" : "14:00:00"
}

Response:    
{
    "code": 200,
    "message": "deleted successfully"
}

<img width="1047" alt="Screen Shot 2022-05-12 at 10 27 45 PM" src="https://user-images.githubusercontent.com/26063120/168128939-84253b91-1334-43d3-a98e-868affa8fa32.png">


Creating a new customer   
POST - https://roombooking-node.herokuapp.com/book/create     

Payload:     
{
    "name": "Customer 1",
    "customerId" : 1,
    "date": "15/05/2022",
    "roomId":  1,
    "startTime" : "14:00:00",
    "endTime" : "15:00:00"
}

Response:    
{
    "message": "Slot already Booked"
}

<img width="1058" alt="Screen Shot 2022-05-12 at 10 27 58 PM" src="https://user-images.githubusercontent.com/26063120/168128981-2b444def-d119-4eef-9c84-a8768c661993.png">

