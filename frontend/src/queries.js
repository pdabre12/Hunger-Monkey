export const get_restaurants=`
query getRestos{
    restaurants{
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
export const get_dishes=`
query getDishes($resteraunt_name:String!,$zipcode:String!){
    dishes(resteraunt_name:$resteraunt_name,zipcode:$zipcode){
          id
                      dish_name
                      dish_desc
                      dishdp
                      resteraunt_name
                      price
        }
  }

`
export const get_resto_orders=`
query getRestoOrders($resteraunt_name:String!,$resteraunt_zipcode:String!,$order_type:String!){
    get_resto_oders(resteraunt_name:$resteraunt_name,zipcode:$resteraunt_zipcode,order_type:$order_type) {
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
Variables for reference
{
  "resteraunt_name": "Popeyes",
  "resteraunt_zipcode": "95126",
  "order_type": "all"
}

*/
export const get_cust_orders=`
query getCustOrders($email:String!,$order_type:String!){
    get_cust_orders(email:$email,order_type:$order_type) {
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
{
  "email":"mary.doe@gmail.com",
  "order_type": "all"
}
*/
export const getCustDetails=`
query getCustDetails($email:String!){
    get_cust_details(email:$email) {
      email
      fullname
      address
      zipcode
      contact
      upassword
      userdp
      city
      country
    }
    
  }


`
/*

{
  "email":"mary.doe@gmail.com"
}

*/
export const getCustLogin=`
query custLogin($email:String!,$upassword:String!){
    get_customer_login(email:$email,upassword:$upassword) {
      email
      fullname
      address
      zipcode
      contact
      upassword
      userdp
      city
      country
    }
  }
`
/*
{
  "email": "michael@gmail.com",
	"upassword": "Michael@123"
}
*/
