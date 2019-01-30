function onmsg_qq(data){
	
}
const { CQWebSocket } = require('cq-websocket')
const bot = new CQWebSocket({
    host: "127.0.0.1",
    port: 6700,
    baseUrl: "",
    qq: "2679125746",
    accessToken: ""
  })
  
  // 設定訊息監聽
  bot
    // 連線例外處理
    .on('socket.error', console.error)
    .on('socket.connecting', (wsType) => console.log('[%s] 建立連線中, 請稍後...', wsType))
    .on('socket.connect', (wsType, sock, attempts) => console.log('[%s] 連線成功 ヽ(✿ﾟ▽ﾟ)ノ 蛆蛆%d個嘗試', wsType, attempts))
    .on('socket.failed', (wsType, attempts) => console.log('[%s] 連線失敗 。･ﾟ･(つд`ﾟ)･ﾟ･ [丑%d] 對噗起', wsType, attempts))
    .on('api.response', (resObj) => console.log('伺服器響應: %O', resObj))
    .on('socket.close', (wsType, code, desc) => console.log('[%s] 連線關閉(%d: %s)', wsType, code, desc))
    .on('ready', () => console.log('今天又是複讀複讀的一天 ｡:.ﾟヽ(*´∀`)ﾉﾟ.:｡'))

    // 聽取私人信息
    .on('message.private', (e, context) => {
      console.log('叮咚 ✿ private')
      console.log(context)
    /*
      // 以下提供三種方式將原訊息以原路送回
      switch (Date.now() % 3) {
        case 0:
          // 1. 調用 CoolQ HTTP API 之 send_msg 方法
          bot('send_msg', context)
          break
        case 1:
          // 2. 或者透過返回值快速響應
          return context.message
        case 2:
          // 3. 或者透過CQEvent實例，先獲取事件處理權再設置響應訊息
          e.stopPropagation()
          e.setMessage(context.message)
      }*/
    })
	.on('message.group', (e, context) => {
		console.log('叮咚 ✿ group')
      console.log(context)
	  onmsg_qq({
		  message: context.message
		  sender: {
			  nick: context.sender.nick
		  }
	  })
	})
  
  bot.connect()
