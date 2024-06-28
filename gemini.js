const axios = require("axios")



async function AI(data){
  try{
const result = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=APIKEY"
,{
  contents: [
      {
          parts: [
              {
                  text: data
              }
          ]
      }
  ]
},{
  'Content-Type': 'application/json'
})
.then(async (response)=>{
return response.data.candidates[0].content.parts[0].text
})
return result
}catch(error){
  console.log(error)
}
}
module.exports = {AI}