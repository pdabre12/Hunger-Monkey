export const insert_customer=`mutation CreateCustomer($email:String!,$fullname:String!,$address:String!,$zipcode:String!,$contact:String!,$pwd:String!,$userdp:String!,$city:String!,$country:String!){
    insert_cust(email:$email,fullname:$fullname,address:$address,zipcode:$zipcode,contact:$contact,pwd:$pwd,userdp:$userdp,city:$city,country:$country){
        email,
      fullname
    }
       
  }`

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