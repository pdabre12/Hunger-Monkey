export const insert_customer=`mutation CreateCustomer($email:String!,$fullname:String!,$zipcode:String!,$contact:String!,$address:String!,$upassword:String!,$city:String!,$country:String!,$userdp:String!){
  insert_cust(email:$email,fullname:$fullname,zipcode:$zipcode,contact:$contact,address:$address,upassword:$upassword,city:$city,country:$country,userdp:$userdp){
     email
  }
     
}

` 
/*
variables needed
{
  "email":"sathesaurabh1803@gmail.com",
        "fullname":"sausathe",
        "address":"cahill park",
        "zipcode":"95126",
        "contact":"9552070984",
        "pwd":"sathesaurabh",
        "userdp":"dsdsadsa@asdsadas.com",
        "city":"San Jose"
        
}

*/
export const insert_owner=`mutation CreateOwner($email:String!,$fullname:String!,$zipcode:String!,$contact:String!,$address:String!,$upassword:String!,$userdp:String!){
  insert_owner(email:$email,fullname:$fullname,zipcode:$zipcode,contact:$contact,address:$address,upassword:$upassword,userdp:$userdp){
     email
  }
     
}

` 
/*
variables needed
{
   {
  "email":"nickthegreek@gmail.com",
        "fullname":"Saurabh Sathe",
        "address":"cahill park",
        "zipcode":"95113",
        "contact":"9552070984",
        "upassword": "sathesaurabh",
        "userdp":"https://ubereatscustomerimagesbucket.s3.amazonaws.com/nickgreek.jpg"
     
        
}
     
}

*/


export const place_order=`
mutation CreateOrder($customer_email:String!,$restaurant_name:String!,$restaurant_zipcode:String!,$amount:Float!,$order_status:String!,$delivery_address:String!,$instructions:String!){
  place_order(customer_email:$customer_email,restaurant_name:$restaurant_name,restaurant_zipcode:$restaurant_zipcode,amount:$amount,order_status:$order_status,delivery_address:$delivery_address,instructions:$instructions) {
    customer_email
    restaurant_name
    restaurant_zipcode
    amount
    order_date
    order_status
    delivery_address
    instructions
  }
  
}

`
/*
variables
{
  "customer_email": "sathesaurabh30@gmail.com",
  "restaurant_name": "Chipotle",
  "restaurant_zipcode": "95126",
  "amount": 65.5,
  "order_status": "placed",
  "delivery_address": "Almeda",
  "instructions": "less spicy please"
        
}

*/

export const update_order=`mutation updateOrder($id:String!,$status:String!){
  update_order(id:$id,status:$status) {
    customer_email
    restaurant_name
    restaurant_zipcode
    amount
    order_date
    order_status
    delivery_address
    instructions
  }
  
}`

/*
{
  "id": "6191d68ef91f8f5de43e41a2",
  "status": "preparing and dsadsaas"
        
}





*/
export const insert_resto=`
mutation createResto($resteraunt_name:String!,$address:String!,$zipcode:String!,$contact:String!,$owner_email:String!,$diet:String!,$pickup_drop:String!,$city:String!,$restdesc:String!,$restdp:String!){
  insert_resto(resteraunt_name:$resteraunt_name,address:$address,zipcode:$zipcode,contact:$contact,owner_email:$owner_email,diet:$diet,pickup_drop:$pickup_drop,city:$city,restdesc:$restdesc,restdp:$restdp) {
    resteraunt_name
    address
    zipcode
    restdp
    contact
    owner_email
    pickup_drop
    diet
    city
    restdesc
  }
}
`

/*
{
  "resteraunt_name" : "restname",
                "address":"restaddr",
                "zipcode":"95126",
                "contact":"9989981313",
                "owner_email":"sathesaurabh1803@gmail.com",
                "diet":"veg",
                "pickup_drop":"pickup",
                "city":"Pune",
                "restdesc":"Authentic Indian resto",
                "restdp":"https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Jack_in_the_Box_2009_logo.svg/1200px-Jack_in_the_Box_2009_logo.svg.png"
                
}


*/
export const insert_dish=`
mutation createDish($dish_name:String!,$resteraunt_name:String!,$zipcode:String!,$dish_desc:String!,$dishdp:String!,$category:String!,$price:Float!){
  insert_dish(dish_name:$dish_name,resteraunt_name:$resteraunt_name,zipcode:$zipcode,dish_desc:$dish_desc,dishdp:$dishdp,category:$category,price:$price) {
    id
   dish_name
  } 
 
}

`
/*
variables needed


{
  "dish_name": "Burger",
  "resteraunt_name": "XXX",
  "zipcode": "95126",
  "dish_desc": "yummy",
  "dishdp": "https://ubereatsdishimages.s3.us-east-2.amazonaws.com/Smash%20Burger94103French%20Fries.JPG",
  "category": "non veg",
  "price": 12.56
}

*/