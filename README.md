# 目錄

[啟動](#啟動)

[簡介](#簡介)

[遊戲房間](#遊戲房間)

[登入註冊](#登入註冊)

如果你喜歡，請給我一顆星，我會很感謝你。
If you like this, please give me a star. Thank you!!

# 啟動

## 前端

Vue/Vuex 開發。

請先安裝 Node 與 Npm。

並輸入下面的指令安裝 modules。

```
$ npm install
```

啟動伺服器

```
$ npm run serve
```

預設 Port 為 8080，位於 localhost。

此外也可以經由 Build 使用打包後的版本。

## 後端

Node/Express 開發。

安裝所需 modules。

```
$ npm install
```

安裝完成後，啟動伺服器 Server。

```
$ npm run start
```

# 簡介

這是一個線上西洋棋網站，玩家可以在網路上與其他人進行即時對戰。

前端使用 Vue 來處理，使用 Router 設定路由，搭配棋子移動與棋子繪製的模塊，使用 Socket.io 來傳遞即時資料等，讓雙方玩家可以享受即時對戰的樂趣。

後端則是會處理接受到的資訊，登入註冊方面設定 model 以及 API，連接 mongoDB 並儲存，

首頁可以張貼一些相關公告。

<img src='https://raw.githubusercontent.com/tsen1220/VueNodeOnlineXChess/master/introimg/Home.jpg' alt=''>

# 遊戲房間

使用者登入後可以進入房間與其他玩家遊玩，而且可以與其他玩家聊天。

所以要先從房間清單，尋找自己想玩的房間並加入。

<img src='https://raw.githubusercontent.com/tsen1220/VueNodeOnlineXChess/master/introimg/room.jpg' alt=''>

如果房間並未存在，玩家會自動彈出，重新尋找房間。

如果房間人數已達兩人，第三個進去的玩家會被系統彈出，請重新尋找房間。

<img src='https://raw.githubusercontent.com/tsen1220/VueNodeOnlineXChess/master/introimg/roomfull.jpg' alt=''>

當然，如果您未登入，將無法進行遊玩。

<img src='https://raw.githubusercontent.com/tsen1220/VueNodeOnlineXChess/master/introimg/beforeLogin.jpg' alt=''>

進入房間時，socket.io 會發送 Vuex 儲存的帳號名稱，和房間名稱，讓伺服器知道是誰進入了這個房間。

進入房間後，棋盤功能會被鎖定，直到有其他玩家加入，在下棋過程中如果不是你的回合，有人離開房間，或是勝利了，功能亦會被鎖定，而後兩者會將棋盤重置。

<img src='https://raw.githubusercontent.com/tsen1220/VueNodeOnlineXChess/master/introimg/game.jpg' alt=''>

```
race setting:

    turn: true,       true:white turn false: black turn
    gamewatching: true      true:can move piece

```

```

socket server:

  socket.on("sendMsg", (msg, userid, roomName) => {
    socket.to(roomName).emit("recMsg", { msg, userid });
  });
  ....

socket client:
      this.$socket.emit("sendMsg", this.msgInput, this.userid, this.roomName);

```

```

Vue socket.io setting:

import VueSocketIO from "vue-socket.io";
import io from "socket.io-client";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io("http://localhost:1111"),
    vuex: {}
  })
);

```

而當玩家離開房間時，會 unsubscribe socket 的監聽器，以免引發效能以及 SPA 多個監聽器等問題。

```

beforeRouteLeave(to, from, next) {
   this.sockets.unsubscribe("recMsg");
   ...
}

    mounted(){
   this.sockets.subscribe("recMsg", data => {
      this.appendMsg(`${data.userid}:${data.msg}`);
    });
    }

```

# 登入註冊

登入頁面:

<img src='https://raw.githubusercontent.com/tsen1220/VueNodeOnlineXChess/master/introimg/Login.jpg'>

註冊頁面:

<img src='https://raw.githubusercontent.com/tsen1220/VueNodeOnlineXChess/master/introimg/register.jpg' alt=''>

基本上這兩個原理是相同的，首先會設定 model，來處理相關資訊。

```
schema setting:

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  ....

```

之後使用 Express Router 設定 API 的相關路由。

再來使用設定好的 model schema，搭配 Joi 檢查 Post 的資訊符不符合設定標準、由 byscript 來 hash 我們的密碼。

```

Joi:
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
      ....
      ....

      return schema.validate(data);

byscript:
  const salt = await bcrypt.genSalt(10);
  const hashpwd = await bcrypt.hash(req.body.password, salt);

```

註冊時會先檢查帳號是否已存在。

```

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

```

而登入時會檢查帳號與密碼是否相符。

```

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email or password is wrong.");
  }

    const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid password");
  }

```

註冊方面確定都沒問題會依照 Schema 將資料放置於 mongoDB 內。

```

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpwd
  });

  try {
    const savedUser = await user.save();
    res.send(user._id);
  } catch (err) {
    res.status(400).send(err);
  }

```

登入成功則會給予 token，使用 jwt，並回傳 token 與 userid。

```
  const username = user.name;
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res
    .header("auth-token", { token: token, userid: username })
    .send({ token: token, userid: username });


```

而傳到前端的資訊會由 Vuex 進行狀態管理，登入註冊的觸發細節位於 actions，在此為一些基本設定。

```

 state:
    token: localStorage.getItem("token") || null,
    userid: localStorage.getItem("userid") || null,
    type: "",
    error: null

  mutations:
    Auth_Start(state)
    Auth_Success(state, token, userid)
    Auth_Fail(state)
    Auth_Logout(state)

```
