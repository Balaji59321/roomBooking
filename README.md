# roomBooking

# Pre-requisite API and its collections.    

Create a new Student.     
POST - https://mentorstudentapi.herokuapp.com/student/create

Payload :           
{
    "id": 1,
    "name": "Student 1",
    "age" : 30,
    "location" : "Chennai",
    "batch" : "B30WE",
    "course" :"full stack"
}

Response:      
{
    "code": 200,
    "message": "Created Successfully"
}

<img width="1138" alt="Screen Shot 2022-05-12 at 6 35 40 PM" src="https://user-images.githubusercontent.com/26063120/168081456-05e9dddb-15e2-4b9e-894f-ac830ab24044.png">

Update a created Student.     
PUT - http://localhost:3000/student/update/1
     
Payload :           
{
    "name": "Student 1 edited name"
}

Response:       
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}   

<img width="1023" alt="Screen Shot 2022-05-12 at 6 49 18 PM" src="https://user-images.githubusercontent.com/26063120/168084661-f59e0e58-5b5c-42b1-96ae-005489310e78.png">

Get all Created Students.   
GET - https://mentorstudentapi.herokuapp.com/student/all    
     
Response:   
[
    {
        "_id": "627d08a80aa5c9fd2a645188",
        "id": 1,
        "name": "Student 1 edited name",
        "age": 30,
        "location": "Chennai",
        "batch": "B30WE",
        "course": "full stack"
    }
]   

<img width="1059" alt="Screen Shot 2022-05-12 at 7 06 14 PM" src="https://user-images.githubusercontent.com/26063120/168087749-75d3a0ac-959b-4c36-ad5a-181f4420746e.png">

Delete a created Student.    
DELETE - https://mentorstudentapi.herokuapp.com/student/delete/1   
       
Response:   
{
    "acknowledged": true,
    "deletedCount": 1
}

<img width="1035" alt="Screen Shot 2022-05-12 at 6 49 05 PM" src="https://user-images.githubusercontent.com/26063120/168084733-c2f111db-c267-470d-916a-df496cf87499.png">

# Mentor   
   
Create a new Mentor.     
POST - https://mentorstudentapi.herokuapp.com/mentor/create    

Payload :           
{
    "id": 1,
    "name": "Mentor 1",
    "age" : 30,
    "location" : "Chennai",
    "batch" : "B30WE",
    "specialization" : ["Js","Node","CSS","HTML"],
    "student" : []
}
    
Response:      
{
    "acknowledged": true,
    "insertedId": "627d0a440aa5c9fd2a645189"
}

<img width="1065" alt="Screen Shot 2022-05-12 at 6 57 46 PM" src="https://user-images.githubusercontent.com/26063120/168086297-fbdc5e1e-9915-488a-9acb-69bd7f6c72ab.png">

Updated a Creted Mentor.     
PUT - https://mentorstudentapi.herokuapp.com/mentor/update/1

Payload :           
{
    "name" : "Mentor 1 edited"
}
    
Response:      
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}

<img width="1065" alt="Screen Shot 2022-05-12 at 6 57 52 PM" src="https://user-images.githubusercontent.com/26063120/168086267-caa0c09a-254f-4023-86c5-e65c611d1df8.png">


Get all Created Mentors.   
GET - https://mentorstudentapi.herokuapp.com/mentor/all   
     
Response:   
[
    {
        "_id": "627d0ad00aa5c9fd2a64518b",
        "id": 1,
        "name": "Mentor 1 edited",
        "age": 30,
        "location": "Chennai",
        "batch": "B30WE",
        "specialization": [
            "Js",
            "Node",
            "CSS",
            "HTML"
        ],
        "student": []
    }
]

<img width="1104" alt="Screen Shot 2022-05-12 at 6 58 33 PM" src="https://user-images.githubusercontent.com/26063120/168086044-9f351f6f-f3d8-4cb1-8ab5-66ff353e75db.png">

Delete a created Mentor.    
DELETE - https://mentorstudentapi.herokuapp.com/mentor/delete/1    
       
Response:   
{
    "code": 200,
    "message": "deleted successfully"
}

<img width="1220" alt="Screen Shot 2022-05-12 at 6 57 56 PM" src="https://user-images.githubusercontent.com/26063120/168086218-0cdd64f0-7395-41ba-918e-a4cd4b568039.png">

# TASK: 
# Write API to create Mentor.(api attached above)   
# Write API to create Student.(api attached above)   
# Write API to Assign a student to Mentor.  
  * Select one mentor and Add multiple Student    
  * A student who has a mentor should not be shown in List.  

PUT https://mentorstudentapi.herokuapp.com/mentor/updateMentor/1

Payload:   
{
    "student": [2]
}

Response:
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}

if mentor already assigned
{
    "message": "All student / any one student has a mentor assigned"
}

<img width="1244" alt="Screen Shot 2022-05-12 at 7 13 21 PM" src="https://user-images.githubusercontent.com/26063120/168089186-14c22385-5d5f-4808-aba1-bd427d6fcb92.png">
 
# Write API to Assign or Change Mentor for particular Student.    
  * Select One Student and Assign one Mentor.  

PUT https://mentorstudentapi.herokuapp.com/mentor/assign/1
(this will assign student 1 to mentor 1)

Payload:
{
    "mentorId": 1
}

Response:
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}

<img width="1128" alt="Screen Shot 2022-05-12 at 7 13 11 PM" src="https://user-images.githubusercontent.com/26063120/168089393-f3247588-7e50-4764-9ef3-2944d1eefa67.png">

# Write API to show all students for a particular mentor.    

GET https://mentorstudentapi.herokuapp.com/mentor/get/1   
(this will get all the students assigned to mentor 1)   

Response:   
[
    {
        "_id": "627d0d4386f53bcee4eb516e",
        "id": 1,
        "name": "Student 1",
        "age": 30,
        "location": "Chennai",
        "batch": "B30WE",
        "course": "full stack",
        "mentor": 1
    }
]

<img width="1126" alt="Screen Shot 2022-05-12 at 7 13 16 PM" src="https://user-images.githubusercontent.com/26063120/168089470-ef10e752-0f4e-4c8d-a2d1-17a8a0f9bbf2.png">


