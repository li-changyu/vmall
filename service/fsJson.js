const fs = require('fs')

fs.readFile('./data_json/goods.json', 'utf8', function(err, data) {
  data = JSON.parse(data)
  let i = 0
  let pushData = []
  data.RECORDS.forEach((item, index) => {
    if (item.IMAGE1 !== null) {
      i++
      pushData.push(item)
      console.log(item.NAME)
    }
  })
  console.log(i)
  
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), function(err){
    if (err) {
      console.log(err)
    } else {
      console.log('success!')
    }
  })
})

