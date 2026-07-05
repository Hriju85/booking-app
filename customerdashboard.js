import React from "react";
import {
 View,
 Text,
 FlatList
} from "react-native";

export default function Dashboard(){

 const businesses = [
   {
    id:1,
    name:"Clinic X",
    wait:"25 mins"
   }
 ];

 return(
  <FlatList
   data={businesses}
   renderItem={({item})=>(
    <View>

      <Text>{item.name}</Text>

      <Text>
       Wait: {item.wait}
      </Text>

    </View>
   )}
  />
 );
}


// live ticket screen
import React,
{
 useEffect,
 useState
}
from "react";

import { socket }
from "../services/socket";

export default function TicketScreen(){

 const [position,setPosition]
 = useState(0);

 const [wait,setWait]
 = useState(0);

 useEffect(()=>{

   socket.on(
    "queueUpdated",
    (data)=>{

      setPosition(
       data.position
      );

      setWait(
       data.wait
      );
    }
   );

 },[]);

 return(
  <>
   <h1>
    Position #{position}
   </h1>

   <h2>
    {wait} mins
   </h2>
  </>
 );
}